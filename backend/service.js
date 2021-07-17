var express = require("express");
var cors = require("cors");
let consumer = require('./Consumer/consumer');
let getSocket = require('./Socket/socket');

var app = express();

const controller = require('./controller')

app.use(cors({
    exposedHeaders: ['Content-Length', 'Content-Type'],
}));

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get("/messages", controller.list);

app.get("/health", async(_, res)=>{
    res.json({result: "It´s Working!"});
});

app.post('/messages', controller.create);

let ws = getSocket();
consumer(ws);

app.listen(8080);