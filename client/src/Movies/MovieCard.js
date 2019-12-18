import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const MovieCard = props => {
  const { title, director, metascore, stars, id } = props.movie;
  return (
    <div className="movie-card">
      <Link to="/update-movie/:id">
        <button>test button</button>
      </Link>
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
    </div>
  );
};

export default MovieCard;
