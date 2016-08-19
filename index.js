//var Web3 = require('web3');
//var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
//var tx = web3.eth.sendTransaction({ "from": web3.eth.accounts[0], to: web3.eth.accounts[0], value:web3.toWei(0.02,'ether'), data:web3.toHex('test'), gas: 200000000});
//console.log(tx);

var port = process.env.PORT || 3000;

// ----------------------------------------------------------------------
//  Init DB
var Datastore = require('nedb');

db = {};
db.receipts = new Datastore({filename:'./data/receipts', autoload: true});

// ----------------------------------------------------------------------
//  Start API server

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/receipts', function (req, res) {
  console.log("POST receipts");

  data = req.body;
  db.receipts.insert([data], function (err, newDocs) {
    res.send(newDocs);
  });
});

app.get('/receipts/:id', function (req, res) {
  var rid = req.params.id;
  
  var dummy = {
    id: rid,
    company: "Foodchain Inc.",
    address: "No. 1, Section 4, Roosevelt Rd, Da’an District, Taipei City, 10617",
    contact: "0912998210",
    sellerTaxID: 42434667,
    buyerTaxID: 24564936,
    taxQuarter: "03-04",
    items: [{
      name: "Red Tomatoes",
      qty: 10,
      price: 20,
      taxCategory: "food",
      fdaCategory: "agriculture",
      ItemProductionDate: 1471620321,
      ItemExpirationDate: 1471620321+60*60*24*90
    }],
    Tax: 123,
    MachineNo: 4711,
    SerialNo: 133742
  }

  db.receipts.find({}, function (err, docs) {
    if (err) {
      throw err;
    }
    res.send(docs);
  });
});


app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
