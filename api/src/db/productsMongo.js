const mongo = require('./mongo');

const getProducts = (callback) => {
    const db = mongo.client.db('test_store');
    db.collection('products').find().toArray((err, result) => {
       if (err) {
           callback(err);
       } else {
           callback(null, result);
       }
    });
};


module.exports = {getProducts};
