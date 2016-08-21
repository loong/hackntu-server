var Datastore = require('nedb');
var sha256 = require('sha256');

db = {};
db.products  = new Datastore({filename:'./data/products', autoload: true});
db.companies = new Datastore({filename:'./data/companies', autoload: true});
db.receipts  = new Datastore({filename:'./data/receipts', autoload: true});

var comps = [
  {
    id: 1992133,
    taxID: 0,
    address: "Pucheng No. 20, Da’an District, Taipei City",
    name: "Customer"
  },
  {
    id: 4711337,
    taxID: 99338103,
    address: "No. 1, Section 4, Roosevelt Rd, Da’an District, Taipei City",
    name: "Store A"
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
    address: "Chikan Rd, Tainan County",
    name: "Farmer Alice"
  }
];

db.companies.insert(comps, function (err, docs) {
  console.log(docs);
});

var prods = [
  {
    "name": "Tomatoes",
    "price": 20,
    "taxCategory": "food",
    "fdaFoodType": "agriculture",
    "productionDate": 1471620321,
    "expirationDate": 1471820512,
    "companyID": 4711337,
  },
  {
    "name": "Egg",
    "price": 2,
    "taxCategory": "food",
    "fdaFoodType": "agriculture",
    "productionDate": 1471620321,
    "expirationDate": 1471820321,
    "companyID": 4711337,
  }
]

db.products.insert(prods, function (err, docs) {
  console.log(docs);
});
