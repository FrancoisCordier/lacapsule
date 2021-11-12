import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import NavigationBar from "./components/NavigationBar";
import MovieCard from "./components/MovieCard";
import FavoriteMovies from "./components/FavoriteMovies";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";

const myMoviz = axios.create({
  baseURL: "http://localhost:3000",
});

function App() {
  const [favoriteMoviesCount, setFavoriteMoviesCount] = useState("Loading...");
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadMovies();
    loadFavoriteMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const response = await myMoviz.get("/new-movies");
      setMovies(response.data.results);
    } catch (err) {
      console.error(err);
    }
  };

  const loadFavoriteMovies = async () => {
    try {
      const response = await myMoviz.get("/favorite");
      setFavoriteMovies(response.data);
      setFavoriteMoviesCount(response.data.length);
    } catch (err) {
      console.error(err);
    }
  };

  const addMovieToFavorite = (movieName, movieImg) => {
    setFavoriteMoviesCount(favoriteMoviesCount + 1);
    setFavoriteMovies([...favoriteMovies, { title: movieName, img: movieImg }]);
    myMoviz.post("/add-favorite", { movieName: movieName, movieImg: movieImg });
  };

  const removeMovieFromFavorite = (movieName) => {
    setFavoriteMoviesCount(favoriteMoviesCount - 1);
    setFavoriteMovies(
      favoriteMovies.filter((movie) => movie.title !== movieName)
    );
    myMoviz.delete(`/remove-favorite/${movieName}`);
  };

  const moviesList = movies.map((movie, index) => {
    const isFavorite = favoriteMovies.some((el) => el.title === movie.title);
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
          removeMovieFromFavorite={removeMovieFromFavorite}
          isFavorite={isFavorite}
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
