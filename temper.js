var Datastore = require('nedb');
db = {}
db.receipts = new Datastore({filename:'./data/receipts', autoload: true});

db.receipts.find({}, function (err, docs) {
  if (err) {
    throw err;
  }

  db.receipts.update({ _id: docs[docs.length-1]._id }, { $set: { taxQuarter: '01-02' } }, { multi: true }, function (err, numReplaced) {
    if (err) {
      console.error(err);
    }
  });
});
