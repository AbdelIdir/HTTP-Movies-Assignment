import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { UpdateMovie } from "../UpdateMovie";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
  Redirect
} from "react-router-dom";

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  movieState = data => {
    this.setState({ movie: data });
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  //   getCurrentMovie = () => {
  //   return this.state.movie.find(amovie=>amovie.id===currentMovieId)
  // }

  getMovie = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err.response));
  };

  deleteMovie = id => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.fetchMovie())
      .catch(err => console.log(err));
    this.props.history.push("/");
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <Link
          style={{
            border: "2px solid black",
            borderRadius: "5px",
            padding: "5px"
          }}
          to={`/movies/${this.state.movie.id}/update-movie/${this.state.movie.id}`}
        >
          Update this movie
        </Link>
        <MovieCard movie={this.state.movie} fetchMovie={this.fetchMovie} />
        <Route
          path={`/movies/:id/update-movie/:id`}
          render={props => {
            return (
              <UpdateMovie
                {...props}
                movie={this.state.movie}
                fetchMovie={this.fetchMovie}
                movieState={this.movieState}
                deleteMovie={this.deleteMovie}
              />
            );
          }}
        />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
      </div>
    );
  }
}

export default withRouter(Movie);
