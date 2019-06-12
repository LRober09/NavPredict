const mongo = require('./mongo');

const createUser = (user, callback) => {
    if (user.email && user.passwordHash && user.phone) {
        const newUser = {
            email: user.email,
            passwordHash: user.passwordHash,
            token: null,
            phone: user.phone,
            profile: {
                cart: [],
                address: {
                    street: "",
                    city: "",
                    state: "",
                    zip: "",
                },
                payment: {
                    cardNumber: "",
                    exp: null,
                    cvc: "",
                },
            }
        };
        mongo.db.collection('users').insertOne(newUser);
        callback(null, newUser)
    } else {
        callback('Invalid user object');
    }
};


const getUser = (token, callback) => {
    if (!token) {
        callback("No token provided");
    } else {
        mongo.db.collection('users').findOne({token: token}, (err, result) => {
            if (!err) {
                callback(null, result);
            } else {
                callback(err);
            }
        })
    }
};


const getUserByEmail = (email, callback) => {
    mongo.db.collection('users').findOne({email: email}, (err, result) => {
        if (!err) {
            callback(null, result);
        } else {
            callback(err);
        }
    });
};


const loginUser = (email, passwordHash, token, callback) => {
    getUserByEmail(email, (err, result) => {
        if (!err && result && result.passwordHash === passwordHash) {
            // create and update token, callback token
            console.log("Updating token to:", token);
            mongo.db.collection('users').updateOne({email: email}, {
                $set: {
                    token: token,
                }
            }, (err) => {
                if (!err) {
                    getUser(token, (getUserErr, getUserResult) => {
                        if (!err && getUserResult) {
                            callback(null, getUserResult);
                        } else {
                            callback("Error while updating user token - during re-fetch of user", err);
                        }
                    });
                } else {
                    callback(err);
                }
            });
        } else if (!err) {
            callback("Invalid email or password");
        } else {
            callback(err);
        }
    });
};

const authenticateUser = (token, callback) => {
    if (token === null || token === undefined) {
        callback(null, false);
    }

    mongo.db.collection('users').findOne({token: token}, (err, result) => {
        console.log("result", result);
        if (!err) {
            callback(null, result !== null);
        } else {
            callback(err);
        }
    });
};

module.exports = {loginUser, createUser, getUser, getUserByEmail, authenticateUser};
