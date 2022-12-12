import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

export default function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3003/api/get").then((response) => {
      setMovieList(response.data);
    });
  }, []);

  const sumbitReview = () => {
    Axios.post("http://localhost:3003/api/insert", {
      movie_name: movieName,
      movie_review: review,
    }); // ? api url
    setMovieList([
      ...movieReviewList,
      { movie_name: movieName, movie_review: review },
    ]);
  };
  return (
    <div className="App">
      <div className="form">
        <h1>CRUD APPLICATION</h1>
        <label>Movie Name: </label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        ></input>
        <label>Review: </label>
        <input
          type="text"
          name="review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        ></input>
        <button onClick={sumbitReview}>Sumbit</button>

        <h3> History Movie:</h3>
        {movieReviewList.map((val) => {
          return (
            <div className="card">
              <h1>{val.movie_name}</h1>
              <p>{val.movie_review}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
