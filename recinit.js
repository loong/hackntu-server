var data = [{ // Bob
  "companyID": 4213377,
  "buyerTaxID": 83028401,
  "taxQuarter": "03-04",
  "items": [{
    "name": "Tomatoes Crop",
    "qty": 123,
    "price": 120,
    "taxCategory": "food",
    "fdaFoodType": "agriculture",
    "productionDate": 1471610321,
    "expirationDate": 1471620321
  }],
  "MachineNo": 4711,
  "SerialNo": 133742
},{ // Bob
  "companyID": 4213377,
  "buyerTaxID": 83028401,
  "taxQuarter": "03-04",
  "items": [{
    "name": "Tomatoes Crop",
    "qty": 250,
    "price": 230,
    "taxCategory": "food",
    "fdaFoodType": "agriculture",
    "productionDate": 1471110321,
    "expirationDate": 1471130321
  }],
  "MachineNo": 4711,
  "SerialNo": 133742
},{ // Alice
  "companyID": 4247117,
  "buyerTaxID": 83028401,
  "taxQuarter": "03-04",
  "items": [{
    "name": "Tomatoes Organic Crop",
    "qty": 50,
    "price": 100,
    "taxCategory": "food",
    "fdaFoodType": "agriculture",
    "productionDate": 1471110321,
    "expirationDate": 1471130321
  }],
  "MachineNo": 47112,
  "SerialNo": 133742
},{ // Alice
  "companyID": 4247117,
  "buyerTaxID": 83028401,
  "taxQuarter": "03-04",
  "items": [{
    "name": "Tomatoes Organic Crop",
    "qty": 30,
    "price": 60,
    "taxCategory": "food",
    "fdaFoodType": "agriculture",
    "productionDate": 1471110321,
    "expirationDate": 1471130321
  }],
  "MachineNo": 4711,
  "SerialNo": 133742
},{ // Alice
  "companyID": 4247117,
  "buyerTaxID": 83028401,
  "taxQuarter": "03-04",
  "items": [{
    "name": "Tomatoes Organic Crop",
    "qty": 60,
    "price": 120,
    "taxCategory": "food",
    "fdaFoodType": "agriculture",
    "productionDate": 1471110321,
    "expirationDate": 1471130321
  }],
  "MachineNo": 4711,
  "SerialNo": 133742
},{ // Distributor
  "companyID": 2606199,
  "buyerTaxID": 99338103,
  "taxQuarter": "03-04",
  "items": [{
    "name": "Tomatoes Wholesale",
    "qty": 1000,
    "price": 1500,
    "taxCategory": "food",
    "fdaFoodType": "agriculture",
    "productionDate": 1471110321,
    "expirationDate": 1471130321
  }],
  "MachineNo": 4711,
  "SerialNo": 133742
},{ // Distributor
  "companyID": 2606199,
  "buyerTaxID": 99338103,
  "taxQuarter": "03-04",
  "items": [{
    "name": "Tomatoes Wholesale",
    "qty": 500,
    "price": 780,
    "taxCategory": "food",
    "fdaFoodType": "agriculture",
    "productionDate": 1471110321,
    "expirationDate": 1471130321
  }],
  "MachineNo": 4711,
  "SerialNo": 133742
},{ // Store
  "companyID": 4711337,
  "buyerTaxID": 1223241,
  "taxQuarter": "03-04",
  "items": [{
    "name": "Tomatoes Organic Crop",
    "qty": 1,
    "price": 20,
    "taxCategory": "food",
    "fdaFoodType": "agriculture",
    "productionDate": 1471110321,
    "expirationDate": 1471130321
  }],
  "MachineNo": 4711,
  "SerialNo": 133742
}]

var request = require('request');
data.forEach(function(d) {
  
  var options = {
    uri:    'http://localhost:4000/companies/'+d.companyID+'/receipts',
    method: 'POST',
    json: d
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('OK');
      return
    }

    console.error(error);
    console.log(response.statusCode);
  });
});
  


