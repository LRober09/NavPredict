const mongo = require('./mongo');

const addSession = (session, callback) => {
    mongo.db.collection('sessions').insertOne(session, null, (err) => {
        if (!err) {
            callback(null);
        } else {
            callback('Error while inserting session');
        }
    });
};

const addIntent = (intent, callback) => {
    mongo.db.collection('intents').updateOne({
        label: intent.label,
    }, {
        $set: {controlId: intent.controlId},
    }, {
        upsert: true,
    }).then(() => {
        callback(null);
    }).catch((err) => {
        console.log('Error: ', err);
        callback('Error while upserting intent');
    });
};

module.exports = {addSession, addIntent};
