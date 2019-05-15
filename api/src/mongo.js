const MongoClient = require('mongodb').MongoClient;

const mongodb = {};

mongodb.init = (callback) => {
    const uri = "mongodb+srv://lrober09:agoodpassword@teststore-s46p7.mongodb.net/test?retryWrites=true";

    MongoClient.connect(uri, (err, client) => {
        db = client.db('test_store');
        callback(db);
    });
};

export default mongodb;