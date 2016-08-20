var Datastore = require('nedb');
var sha256 = require('sha256');

db = {};
db.products  = new Datastore({filename:'./data/products', autoload: true});
db.companies = new Datastore({filename:'./data/companies', autoload: true});
db.receipts  = new Datastore({filename:'./data/receipts', autoload: true});

var comps = [
  {
    id: 4711337,
    taxID: 99338103,
    address: "No. 1, Section 4, Roosevelt Rd, Da’an District, Taipei City",
    name: "Foodchain Inc."
  },
  {
    id: 2606199,
    taxID: 83028401,
    address: "21 Nanda Rd, Hsinchu City",
    name: "Distributer B"
  },
  {
    id: 4213377,
    taxID: 18371982,
    address: "42 Dongmen Rd, Hualien County",
    name: "Farmer Bob"
  },
  {
    id: 4247117,
    taxID: 30102839,
    name: "Chikan Rd, Tainan County"
  }
];

db.companies.insert(comps, function (err, docs) {
  console.log(docs);
});

var prods = [
  {
    "name": "Red Tomatoes",
    "price":20,
    "taxCategory":"food",
    "fdaFoodType":"agriculture",
    "productionDate":1471620321,
    "expirationDate":1471820321,
    "companyID":4711337
  },
  {
    "name":"Egg",
    "price":2,
    "taxCategory":"food",
    "fdaFoodType":"agriculture",
    "productionDate":1471620321,
    "expirationDate":1471820321,
    "companyID":4711337
  }
]

db.products.insert(prods, function (err, docs) {
  console.log(docs);
});


var receipts = [
  {
    "taxQuarter": "03-04",
    "items": [
      {
        "name": "Red Tomatoes",
        "qty": 10,
        "price": 20,
        "taxCategory": "food",
        "fdaFoodType": "agriculture",
        "productionDate": 1471620321,
        "expirationDate": 1471620321
      }
    ],
    "MachineNo": 4711,
    "SerialNo": 133742,
    "companyID": 4711337,
    "sellerTaxID": 99338103
  },
  {
    "buyerTaxID": 99338103,
    "taxQuarter": "03-04",
    "items": [
      {
        "name": "Tomatoes Wholesale",
        "qty": 1000,
        "price": 10000,
        "taxCategory": "food",
        "fdaFoodType": "agriculture",
        "productionDate": 1471610321,
        "expirationDate": 1471620321
      }
    ],
    "MachineNo": 4711,
    "SerialNo": 133742,
    "companyID": 2606199,
    "sellerTaxID": 83028401
    },
  {
    "buyerTaxID": 83028401,
    "taxQuarter": "03-04",
    "items": [
      {
        "name": "Tomatoes Crop",
        "qty": 200,
        "price": 200,
        "taxCategory": "food",
        "fdaFoodType": "agriculture",
        "productionDate": 1471610321,
        "expirationDate": 1471620321
      }
    ],
    "MachineNo": 4711,
    "SerialNo": 133742
   },
  {
    "buyerTaxID": 83028401,
    "taxQuarter": "03-04",
    "items": [
      {
        "name": "Tomatoes Crop",
        "qty": 300,
        "price": 250,
        "taxCategory": "food",
        "fdaFoodType": "agriculture",
        "productionDate": 1471610321,
        "expirationDate": 1471620321
      }
    ],
    "MachineNo": 4711,
    "SerialNo": 133742,
    "companyID": 4213377,
    "sellerTaxID": 18371982
   },
  {
    "buyerTaxID": 83028401,
    "taxQuarter": "03-04",
    "items": [
      {
        "name": "Tomatoes Crop",
        "qty": 100,
        "price": 100,
        "taxCategory": "food",
        "fdaFoodType": "agriculture",
        "productionDate": 1471610321,
        "expirationDate": 1471620321
      }
    ],
    "MachineNo": 4711,
    "SerialNo": 133742,
    "companyID": 4247117,
    "sellerTaxID": 30102839
   }
];


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

var docs = receipts;
for(i=0; i<docs.length;i++) {
  
  // copied from main code
  var msg = sha256(JSON.stringify(docs[i]));
  var err, txid = toChain(msg);
  // @todo handle error
  
  console.log("TxID:" + txid);
  docs[i].chainID = txid;

  console.log(docs[i]);

};

db.receipts.insert(receipts, function (err, docs) {
  console.log(docs);
});
