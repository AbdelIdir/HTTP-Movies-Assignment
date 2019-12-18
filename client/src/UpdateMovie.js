import React, { useState } from "react";
import Axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";

export const UpdateMovie = props => {
  const [currentMovieId, setCurrentMovieId] = useState(props.movie.id);
  console.log("CONSOLE OUTPUT: props.movie.id", props.movie);

  const UpdateMoviePut = ({ id, title, director, metascore, actors }) => {
    Axios.put(`localhost:5000/api/movies/${id}`, {
      title,
      director,
      metascore,
      actors
    })
      .then(res => {
        setCurrentMovieId(null);
        props.fetchMovie();
      })
      .catch(err => console.log(err));
  };

  const getMovies = () => {
    Axios.get(`http://localhost:5000/api/movies/`)
      .then(res => props.movieSate(res.data))
      .catch(err => console.log(err.response));
  };

  const [formValues, setFormValues] = useState({
    title: props.movie.title,
    director: props.movie.director,
    metascore: props.movie.metascore,
    stars: props.movie.stars
  });

  const onValueChange = event => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div>
      <form onSubmit={null}>
        <input
          type="text"
          placeholder="title"
          value={formValues.title}
          onChange={onValueChange}
          name="title"
        />
        <input
          type="text"
          placeholder="director"
          value={formValues.director}
          onChange={onValueChange}
          name="director"
        />
        <input
          type="text"
          placeholder="metascore"
          value={formValues.metascore}
          onChange={onValueChange}
          name="metascore"
        />
        <input
          type="text"
          placeholder="actors"
          value={formValues.stars}
          onChange={onValueChange}
          name="stars"
        />
        <button style={{ marginBottom: "30px" }}>
          Update this movie's infos
        </button>
        <button onClick={() => props.deleteMovie(props.movie.id)}>
          Delete this movie
        </button>
      </form>
    </div>
  );
};

export default withRouter(UpdateMovie);
