const { Router } = require("express");
const shorturl = require("./shorturl");
const bodyParser = require('body-parser')
const api = Router();
api.use(bodyParser.json());
const statistic = require("./statistic");
api.use("/statistic", statistic);

api.use("/shorturl", shorturl);

module.exports = api;