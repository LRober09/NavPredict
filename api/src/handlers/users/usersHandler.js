const rUtil = require('../../util/rUtil');
const util = require('../../util/util');
const usersMongo = require('../../db/usersMongo');

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
    post: createUserHandler,
};

module.exports = UsersHandler;