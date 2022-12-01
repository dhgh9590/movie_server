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

//영화 목록 데이터 가지고 오기
app.get("/list", function (req, res) {
  db.collection("movieList")
    .find()
    .toArray(function (에러, 결과) {
      res.json({ movie: 결과 });
    });
});

//평점 수정
app.put("/edit", function (req, res) {
  db.collection("movieList").updateOne(
    { id: req.body.id },
    { $set: { grade: req.body.grade, grade_user: req.body.grade_user } },
    function (에러, 결과) {}
  );
});

//검색 기능
app.post("/search", function (req, res) {
  console.log(req.body.search);
  const 검색조건 = [
    {
      $search: {
        index: "movieTitleSearch", //db search에서 만든 이름
        text: {
          query: req.body.search,
          path: "title", //검색할 목록의 이름
        },
      },
    },
    { $sort: { id: 1 } },
  ];
  db.collection("movieList")
    .aggregate(검색조건)
    .toArray((에러, 결과) => {
      console.log(결과);
      res.json({ searchItem: 결과 });
    });
});
