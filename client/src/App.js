function App() {
  return (
    <div className="App">
      <div className="form">
        <h1>CRUD APPLICATION</h1>
        <label>Movie Name: </label>
        <input type="text" name="movieName"></input>
        <label>Review: </label>
        <input type="text" name="review"></input>
        <button>Sumbit</button>
      </div>
    </div>
  );
}

export default App;
