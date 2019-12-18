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
  // console.log("CONSOLE OUTPUT: props.movie.id", props.movie);

  // const getMovies = () => {
  //   Axios.get(`http://localhost:5000/api/movies/`)
  //     .then(res => props.movieSate(res.data))
  //     .catch(err => console.log(err.response));
  // };

  const [formValues, setFormValues] = useState({
    id: props.movie.id,
    title: "",
    director: "",
    metascore: 0,
    stars: [props.movie.stars]
  });

  console.log(formValues);
  const onValueChange = event => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  };

  const deleteMovie = id => {
    Axios.delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        props.fetchMovie();
        props.history.push("/");
        console.log(res.data);
      })

      .catch(err => console.log(err));
  };

  const UpdateMoviePut = (id, event) => {
    event.preventDefault();

    Axios.put(`http://localhost:5000/api/movies/${id}`, formValues)
      .then(res => {
        // setCurrentMovieId(null);
        props.fetchMovie();
        console.log(res.data);
        props.history.push("/");
      })
      .catch(err => console.log("NOT WORKING", err));
  };
  console.log(UpdateMoviePut);
  return (
    <div>
      <form onSubmit={event => UpdateMoviePut(formValues.id, event)}>
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
        <button style={{ marginBottom: "30px" }} type="submit">
          Update this movie's infos
        </button>
        <button onClick={() => deleteMovie(props.movie.id)}>
          Delete this movie
        </button>
      </form>
    </div>
  );
};

export default withRouter(UpdateMovie);
