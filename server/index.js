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

app.use(cors());
// info json formatter
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

// ! all movies
// * read  process
app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_review";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
    console.log(result);
  });
});

// ? frontend request
// * add process
app.post("/api/insert", (req, res) => {
  const movie = req.body.movie_name;
  const review = req.body.movie_review;
  const sql = `INSERT INTO movie_review (movie_name, movie_review) VALUES (?,?)`;
  db.query(sql, [movie, review], (err, result) => {
    res.send(result);
  });
});

// ! delete process
app.delete("/api/delete/:movie_name", (req, res) => {
  const name = req.params.movie_name;
  const sql = `DELETE FROM movie_review WHERE movie_name = ?`;
  db.query(sql, [name], (err) => {
    if (err) console.log(err);
  });
});

// ? update process
app.put("/api/update", (req, res) => {
  const movie = req.body.movie_name;
  const review = req.body.movie_review;
  const sql = `UPDATE  movie_review SET movie_review = ? WHERE movie_name = ?`;

  db.query(sql, [review, movie], (err, results) => {
    if (err) console.log(err);
  });
});
//?  listen port 3003 8
app.listen(3003, () => {
  console.log("running on port 3003");
});
