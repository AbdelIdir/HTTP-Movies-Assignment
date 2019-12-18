import React, { useState } from "react";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "../src/UpdateMovie";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      {/* <Link to="/update-movie/:id">Update a movie</Link> */}
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route path="/update-movie/:id" component={UpdateMovie} />
    </>
  );
};

export default App;
