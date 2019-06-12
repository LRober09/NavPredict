const rUtil = require('../../util/rUtil');
const util = require('../../util/util');
const usersMongo = require('../../db/usersMongo');


const getUserHandler = (req, res) => {
    const token = req.headers.token;
    usersMongo.getUser(token, (err, result) => {
        if (!err && result !== undefined && result !== null) {
            rUtil.endResponse(rUtil.codes.OK, result, res);
        } else if (!err) {
            rUtil.endResponse(rUtil.codes.NOT_FOUND, {Error: "Could not find user"}, res);
        } else {
            rUtil.endResponse(rUtil.codes.SERVER_ERROR, {Error: err}, res);
        }
    });
};


const createUserHandler = (req, res) => {
    // Get products from mongodb
    const user = req.body;
    if (user.email && user.password && user.phone) {
        const passwordHash = util.hashPassword(user.password);
        usersMongo.getUserByEmail(user.email, (userExistsDbErr, result) => {
            if (!userExistsDbErr && result === null) {
                usersMongo.createUser({
                    email: user.email,
                    passwordHash: passwordHash,
                    phone: user.phone,
                }, (createUserDbErr, result) => {
                    if (!createUserDbErr) {
                        rUtil.endResponse(rUtil.codes.OK, result, res);
                    } else {
                        rUtil.endResponse(rUtil.codes.SERVER_ERROR, {Error: createUserDbErr}, res);
                    }
                });
            } else if (!userExistsDbErr) {
                rUtil.endResponse(rUtil.codes.BAD_REQUEST, {Error: "User already exists"}, res);
            } else {
                rUtil.endResponse(rUtil.codes.SERVER_ERROR, {Error: userExistsDbErr}, res);
            }
        })
    } else {
        rUtil.endResponse(rUtil.codes.BAD_REQUEST, {Error: "Invalid user object"}, res);
    }
};

const UsersHandler = {
    get: getUserHandler,
    post: createUserHandler,
};

module.exports = UsersHandler;