var Datastore = require('nedb');

db = {};
db.products  = new Datastore({filename:'./data/products', autoload: true});
db.companies = new Datastore({filename:'./data/companies', autoload: true});

var comps = [
  {
    id: 4711337,
    taxID: 99338103,
    name: "Foodchain Inc."
  },
  {
    id: 2606199,
    taxID: 83028401,
    name: "Distributer B"
  },
  {
    id: 4213377,
    taxID: 18371982,
    name: "Farmer Bob"
  },
  {
    id: 4247117,
    taxID: 30102839,
    name: "Farmer Jason"
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
