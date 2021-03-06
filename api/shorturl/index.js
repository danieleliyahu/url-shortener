const { Router } = require("express");
const task = require("./task");

const bodyParser = require('body-parser')
const shorturl = Router();
shorturl.use(bodyParser.json());


shorturl.use("/new", task);
// shorturl.use("*", (req, res) => {
//     res.send("Not found! :(");
//   });
module.exports = shorturl;