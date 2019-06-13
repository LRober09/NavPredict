const rUtil = require('../util/rUtil');
const util = require('../util/util');
const sessionsMongo = require('../db/sessionsMongo');
const requestCluster = require('../requests/prediction').requestCluster;


const addSessionHandler = (req, res) => {
    const session = req.body;
    if (session) {
        sessionsMongo.addSession(session, (err) => {
            if (!err) {

                const intentControl = session.interactions.sort((a, b) => {
                    return a.dateTime >= b.dateTime
                })[session.interactions.length - 1];
                const intent = {
                    label: intentControl.intent.label,
                    controlId: intentControl.controlId,
                };

                sessionsMongo.addIntent(intent, (upsetIntentErr) => {
                    if (!upsetIntentErr) {
                        requestCluster(session, (result) => {
                            rUtil.endResponse(rUtil.codes.OK, result, res);
                        }, (err) => {
                            console.log('Error: ', err);
                            rUtil.endResponse(rUtil.codes.SERVER_ERROR, {Error: 'Server error while querying prediction API'}, res);
                        });
                    } else {
                        rUtil.endResponse(rUtil.codes.SERVER_ERROR, {Error: upsetIntentErr}, res);
                    }
                });
            } else {
                rUtil.endResponse(rUtil.codes.SERVER_ERROR, {Error: 'Server error while adding session'}, res);
            }
        });
    } else {
        rUtil.endResponse(rUtil.codes.BAD_REQUEST, {Error: "Invalid session object"}, res);
    }
};

const SessionsHandler = {
    post: addSessionHandler,
};

module.exports = SessionsHandler;