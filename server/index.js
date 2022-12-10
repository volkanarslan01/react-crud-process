// ? create express server
const express = require("express");

// ? dependency express
const app = express();

// ? mysql
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mysql123",
  database: "crud-database",
});

app.get("/", (req, res) => {
  const sql =
    "INSERT INTO movie_reviews (movie_name , movie_review) VALUES ('iron man', 'good movies');";
  db.query(sql, (err, result) => {
    res.send("hello");
  });
  // ? info send frontend
});

//?  listen port 3003
app.listen(3003, () => {
  console.log("running on port 3003");
});
