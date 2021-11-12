import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import NavigationBar from "./components/Navbar";
import MovieCard from "./components/Card";
import FavoriteMovies from "./components/FavoritesDropdown";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";

function App() {
  const [favoriteMoviesCount, setFavoriteMoviesCount] = useState(0);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/new-movies").then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  const addMovieToFavorite = (movieName, movieImg) => {
    setFavoriteMoviesCount(favoriteMoviesCount + 1);
    setFavoriteMovies([
      ...favoriteMovies,
      { name: movieName, img: movieImg, favorite: true },
    ]);
  };

  const removeMovieFromFavorite = (movieName) => {
    setFavoriteMoviesCount(favoriteMoviesCount - 1);
    setFavoriteMovies(
      favoriteMovies.filter((movie) => movie.name !== movieName)
    );
  };

  // for (let movie of movies) {
  //   movie.favorite = favoriteMovies.find((e) => e.name === movie.name)
  //     ? true
  //     : false;
  // }

  const moviesList = movies.map((movie, index) => {
    return (
      <Col key={index}>
        <MovieCard
          key={index}
          movieName={movie.title}
          movieDesc={
            movie.overview.length > 200
              ? movie.overview.substring(0, 200) + " ..."
              : movie.overview
          }
          movieImg={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          voteCounter={movie.vote_count}
          globalRating={movie.vote_average}
          addMovieToFavorite={addMovieToFavorite}
          // removeMovieFromFavorite={removeMovieFromFavorite}
          // isFavorite={el.favorite}
          viewCounter={movie.popularity}
        />
      </Col>
    );
  });

  return (
    <div className="App bg-dark">
      <NavigationBar />
      <Container className="mt-3">
        <Row>
          <Col className="d-flex justify-content-end mb-3">
            <FavoriteMovies
              favoriteMoviesCount={favoriteMoviesCount}
              favoriteMovies={favoriteMovies}
              removeMovieFromFavorite={removeMovieFromFavorite}
            />
          </Col>
        </Row>
        <Row xs="1" lg="2" xl="3" className="g-4">
          {moviesList}
        </Row>
      </Container>
    </div>
  );
}

export default App;
