const { Router } = require("express");
const shorturl = require("./shorturl");

const api = Router();

api.use("/shorturl", shorturl);

module.exports = api;