const authenticator = require('./handlers/authenticator');

const ProductsHandler = require('./handlers/products/productsHandler');
const ProductsDetailHandler = require('./handlers/products/productsDetailHandler');
const UsersHandler = require('./handlers/users/usersHandler');
const LoginHandler = require('./handlers/users/loginHandler');
const DefaultHandler = require('./handlers/defaultHandler');

const endpoints = {
    products: {
        endpoint: '/products',
        handler: ProductsHandler,
        methods: ['get'],
        authenticated: false,
    },
    productsDetail: {
        endpoint: '/products/:productId',
        handler: ProductsDetailHandler,
        methods: ['get'],
        authenticated: false,
    },
    users: {
        endpoint: '/users',
        handler: UsersHandler,
        methods: ['post'],
        authenticated: false,
    },
    login: {
        endpoint: '/login',
        handler: LoginHandler,
        methods: ['post'],
        authenticated: false,
    }
};


/**
 * Builds and initializes routes from the endpoints object
 * @param app expressjs app object
 */
const routes = (app) => {
    Object.keys(endpoints).forEach((epKey) => {
        const endpoint = endpoints[epKey];
        const path = endpoint.endpoint;
        const methods = endpoint.methods;
        const authenticated = endpoint.authenticated;

        methods.forEach((method) => {
            app[method](path, (req, res, next) => {
                if (authenticated) {
                    authenticator(endpoint.handler[method], req, res, next);
                } else {
                    endpoint.handler[method](req, res, next);
                }
            });
        })
    });

    // Handle unknown routes with 404
    app.use(DefaultHandler.notFound)
};

let router = {
    initRoutes: (app) => {
        routes(app);
    }
};


module.exports = router;