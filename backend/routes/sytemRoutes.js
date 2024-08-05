const express = require("express");
const appRout = new express.Router();

appRout.get("/", (req, res) => {
  res.send("<h1>Welcome to NodeJs server side client with online mongodb</h1>");
});

module.exports = appRout;
