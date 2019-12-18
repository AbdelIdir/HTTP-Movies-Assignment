import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }


  getAllMovies = () => {
  axios
    .get("http://localhost:5000/api/movies")
    .then(res => this.setState({ movies: res.data }))
    .catch(err => console.log(err.response));
}

  componentDidMount() {
    this.getAllMovies()
  }

  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} getAllMovies={this.getAllMovies} />
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie,getAllMovies }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} getAllMovies={getAllMovies} />
    </Link>
  );
}
