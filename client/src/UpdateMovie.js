import React, { useState } from "react";
import Axios from "axios";

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

  const getCurrentMovie = () => {
    return props.movie.find(amovie => amovie.id === currentMovieId);
  };

  const deleteMovie = id => {
    Axios.delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => props.fetchMovie())
      .catch(err => console.log(err));
  };
  return (
    <div>
      <form onSubmit={null}>
        <input
          type="text"
          placeholder="title"
          value={props.movie.title}
          onChange={null}
        />
        <input
          type="text"
          placeholder="director"
          value={props.movie.director}
          onChange={null}
        />
        <input
          type="text"
          placeholder="metascore"
          value={props.movie.metascore}
          onChange={null}
        />
        <input
          type="text"
          placeholder="actors"
          value={props.movie.stars}
          onChange={null}
        />
        <button style={{ marginBottom: "30px" }}>
          Update this movie's infos
        </button>
        <button onClick={() => deleteMovie(props.movie.id)}>
          Delete this movie
        </button>
      </form>
    </div>
  );
};
