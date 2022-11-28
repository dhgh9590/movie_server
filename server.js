const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
var cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

let db;
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(
  "mongodb+srv://dhgh9590:ghtjfl00@cluster0.emvbk.mongodb.net/?retryWrites=true&w=majority",
  function (에러, client) {
    app.listen(8080, function () {
      db = client.db("movie");
      console.log("server on 8080");
    });
  }
);
