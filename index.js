var port = process.env.PORT || 3000;
var isFrontTest = process.env.FrontTest || false;

// ----------------------------------------------------------------------
//  Init DB
var Datastore = require('nedb');

db = {};
db.receipts = new Datastore({filename:'./data/receipts', autoload: true});
db.products = new Datastore({filename:'./data/products', autoload: true});

// ----------------------------------------------------------------------
//  Blockchain helpers
// Add hash to blockchain
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var sha256 = require('sha256');
var sleep = require('sleep');

function checkIsMined(tx, tries, maxTries) {
  if (tries >= maxTries) {
    return new Error("Max trial reached, trannsaction could not be mined. Is miner running?");
  }
  
  var mined = web3.eth.getTransaction(tx);
  if (mined != null && mined.blockNumber != null) {
    console.log(mined);
    return null, mined
  }

  sleep.sleep(1);
  
  return checkIsMined(tx, tries+1, maxTries);
}

function checkIsValid(obj) {
  txid = obj.chainID;
  rid = obj._id;

  if (txid == null) {
    return false
  }

  chainData = fromChain(txid);

  // Temporarily remove chainID to create Hash
  delete obj.chainID;
  delete obj._id;
  hash = sha256(JSON.stringify(obj));
  obj.chainID = txid;
  obj.id = rid;
  
  if (chainData == hash) {
    return true
  }

  return false
}

function toChain(msg) {
  var tx = web3.eth.sendTransaction({
    "from": web3.eth.accounts[0],
    to: web3.eth.accounts[0],
    value:web3.toWei(0.02,'ether'),
    data:web3.toHex(msg),
    gas: 200000000
  });
  
  var err, mined = checkIsMined(tx, 0, 60);
  if (err) {
    console.error(err);
    return err
  }

  return null, mined.hash;
}

function fromChain(txid) {
  var tx = web3.eth.getTransaction(txid);
  var data = web3.toAscii(tx.input);

  return data;
}

// ----------------------------------------------------------------------
//  Start API server

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/receipts', function (req, res) {
  console.log("POST receipts");

  data = req.body;

  if (!isFrontTest) {
    var msg = sha256(JSON.stringify(data));
    var err, txid = toChain(msg);
    // @todo handle error
    
    console.log("TxID:" + txid);
    data.chainID = txid;
  }

  db.receipts.insert([data], function (err, newDocs) {
    res.send(newDocs);
  });
});

app.get('/receipts/:id*?', function (req, res) {
  var rid = req.params.id;
  var search = {}

  if (rid != null) {
    search._id = rid;
  }
  
  db.receipts.find(search, function (err, docs) {
    if (err) {
      throw err;
    }

    // Check every element for validity
    if (!isFrontTest) {
      for(i=0; i<docs.length; i++) {
	var elem = docs[i];
	
	if (!checkIsValid(elem)) {
	  console.log("Not valid!");
	  newElem = {
	    WARNING: "Object got tampered!",
	    id: elem.id,
	    sellerTaxID: elem.SellerTaxID,
	    buyerTaxID: elem.buyerTaxID,
	    chainID: elem.chainID
	  }

	  docs[i] = newElem;
	};
      };
    }
    
    res.send(docs);
  });
});

app.post('/companies/:id/products', function (req, res) {
  var cid = req.params.id;

  var data = req.body
  data.companyID = cid;

  db.products.insert([data], function (err, newDocs) {
    res.send(newDocs);
  });
});
  
app.get('/companies/:id/products', function (req, res) {
  var cid = req.params.id;

  db.products.find({companyID: cid}, function (err, docs) {
    res.send(docs);
  });
});

if (isFrontTest) {
  console.log("Is Testing");
}

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
