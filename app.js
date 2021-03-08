require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const shortid = require('shortid');
const api = require("./api");
app.use("/api", api);
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use("/public", express.static(`./public`));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});


module.exports = app;

