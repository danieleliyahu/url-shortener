const { Router } = require("express");
const shorturl = require("./shorturl");
const bodyParser = require('body-parser')
const api = Router();
api.use(bodyParser.json());

api.use("/shorturl", shorturl);

module.exports = api;