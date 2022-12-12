// ? create express server
const express = require("express");

require("dotenv").config();

// ? cors
const cors = require("cors");

// ? dependency express
const app = express();

// * json parser body parser

const bodyParser = require("body-parser");
// ? mysql
const db = require("./Middleware/mysqlhandler.js");
// !  app.get("/", (req, res) => {
//   const sql =
//     "INSERT INTO movie_reviews (movie_name , movie_review) VALUES ('iron man', 'good movies');";
//   db.query(sql, (err, result) => {
//     res.send("hello");
//   });
//   // ? info send frontend
//  !! });

// ! you should write

app.use(cors());
// info json formatter
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

// ! all movies
app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_review";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
    console.log(result);
  });
});

// ? frontend request
app.post("/api/insert", (req, res) => {
  const movie = req.body.movie_name;
  const review = req.body.movie_review;
  const sql = `INSERT INTO movie_review (movie_name, movie_review) VALUES (?,?)`;
  db.query(sql, [movie, review], (err, result) => {
    res.send(result);
  });
});

//?  listen port 3003
app.listen(3003, () => {
  console.log("running on port 3003");
});
