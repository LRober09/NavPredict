const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./mongo');
const app = express();
const port = 8000;

const server = {};

server.initRoutes = () => {
    app.get('/', (req, res) => res.send("Up!"));
};

server.initDb = () => {
    mongodb.init((client) => {

    })
};

server.initServer = () => {
    const app = express();

    server.initRoutes();

    app.listen(port, () => console.log("App listening on port " + 3000));
};

export default server;