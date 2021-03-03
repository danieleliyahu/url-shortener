const { Router } = require("express");
const task = require("./task");

const shorturl = Router();

shorturl.use("/new", task);
// shorturl.use("*", (req, res) => {
//     res.send("Not found! :(");
//   });
module.exports = shorturl;