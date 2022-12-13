import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

export default function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    //  *  read process
    Axios.get("http://localhost:3003/api/get").then((response) => {
      setMovieList(response.data);
    });
  }, []);

  const sumbitReview = () => {
    // ?  add process
    Axios.post("http://localhost:3003/api/insert", {
      movie_name: movieName,
      movie_review: review,
    });

    //
    setMovieList([
      ...movieReviewList,
      { movie_name: movieName, movie_review: review },
    ]);
  };

  // ! delete process
  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3003/api/delete/${movie}`);
  };

  const updateReview = (movie) => {
    Axios.put(`http://localhost:3003/api/update`, {
      movie_name: movie,
      movie_review: newReview,
    });
  };
  return (
    <div className="App">
      <div className="form">
        <h1>CRUD APPLICATION</h1>

        <label>Movie Name: </label>

        <input
          type="text"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />

        <label>Review: </label>

        <input
          type="text"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />

        <button onClick={sumbitReview}>Sumbit</button>

        <h3> History Movie:</h3>

        {movieReviewList.map((val) => {
          return (
            <div className="card">
              <h1>{val.movie_name}</h1>
              <p>{val.movie_review}</p>

              <button
                type="button"
                className="btn-delete"
                onClick={() => {
                  deleteReview(val.movie_name);
                }}
              >
                Delete
              </button>

              <input
                type="text"
                id="updateInput"
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              />
              <button
                type="button"
                className="btn"
                onClick={() => {
                  updateReview(val.movie_name);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
