var Datastore = require('nedb');

db = {};
db.products  = new Datastore({filename:'./data/products', autoload: true});
db.companies = new Datastore({filename:'./data/companies', autoload: true});

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
