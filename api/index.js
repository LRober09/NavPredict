const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 8000;

MongoClient.connect('', (err, database) => {
    // start server;
});


app.get('/', (req, res) => res.send("Hello world!"));


app.listen(port, () => console.log("App listening on " + port));