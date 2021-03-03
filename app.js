require("dotenv").config();
const express = require("express");
const api = require('./api')
const cors = require("cors");
const app = express();

app.use("/api", api);


module.exports = app;
