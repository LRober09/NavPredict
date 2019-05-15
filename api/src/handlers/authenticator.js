const authenticator = (handler, req, res, next) => {
    handler(req, res, next);

    // @TODO: authenticate
};

module.exports = authenticator;