const { MongoClient } = require("mongodb");

const connectionString = process.env.DATABASE_URL;

// Create a mongo client to set up a connection
const client = new MongoClient(connectionString);

let dbConnection;

exports.connectToDBServer = function (callback) {
  // Connect client to Database
  client.connect(function (err, client) {
    if (err || !client) {
      return callback(err);
    }

    // Database Connection for interacting with Database Collections
    dbConnection = client.db(process.env.DB_NAME);

    return callback();
  });
};

exports.getDb = function () {
  return dbConnection;
};
