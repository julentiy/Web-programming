const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const csvtojson = require("csvtojson");
const mongodb = require("mongodb").MongoClient;

csvtojson()
  .fromFile("candy-data.csv")
  .then(csvData => {
    console.log(csvData);

    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;

        client
          .db("myProject")
          .collection("documents")
          .insertMany(csvData, (err, res) => {
            if (err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  });