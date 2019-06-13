const mongo = require('./mongo');

const closeSession = (session, callback) => {
    mongo.db.collection('sessions').replaceOne({sessionId: session.sessionId}, session, {upsert: true}, (err) => {
        if (!err) {
            callback(null);
        } else {
            console.log('Error: ', err);
            callback('Error while inserting session');
        }
    });
};

const updateSession = (session, callback) => {
    mongo.db.collection('sessions').updateOne({sessionId: session.sessionId}, {
        $set: {...session},
    }, {upsert: true}).then(() => {
        callback(null);
    }).catch((err) => {
        console.log('Error: ', err);
        callback('Error while updating session');
    })
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

module.exports = {closeSession, updateSession, addIntent};
