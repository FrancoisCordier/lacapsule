import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import NavigationBar from "./components/Navbar";
import MovieCard from "./components/Card";
import FavoriteMovies from "./components/FavoritesDropdown";
import { Container, Row, Col } from "reactstrap";

const movies = [
  {
    name: "Bad Boys 3",
    desc: "Marcus Burnett est maintenant inspecteur de police. Mike Lowery est, quant à lui, en pleine crise de la quarantaine. Ils s'unissent à nouveau lorsqu'un mercenaire albanais, dont ils ont tué le frère, leur promet une importante prime.",
    img: "/badboy3.jpg",
    note: 1,
    vote: 2,
  },
  {
    name: "Frozen",
    desc: "Un dimanche alors que la nuit tombe sur une station de ski, trois amis décident d'utiliser un télésiège pour se rendre au sommet des pistes afin de faire une dernière descente avant la fermeture de la station pour la semaine. Pensant qu'il n'y a plus personne sur les téléfériques, les gardiens de la station arrêtent les remontées et bloquent sans le savoir les 3 skieurs à 10 mètres au dessus du sol dans un froid terrible. La nuit est tombée et une tempête de neige approche.",
    img: "frozen.jpg",
    note: 2,
    vote: 3,
  },
  {
    name: "Jumanji",
    desc: "Lors d'une partie de Jumanji, un jeu très ancien, le jeune Alan est propulsé sous les yeux de son amie d'enfance, Sarah, dans un étrange pays. Il ne pourra s'en échapper que lorsqu'un autre joueur reprendra la partie et le libérera sur un coup de dés. Vingt-six ans plus tard, il retrouve le monde réel par le coup de dés de deux autres jeunes joueurs, Judy et Peter.",
    img: "jumanji.jpg",
    note: 3,
    vote: 5,
  },
  {
    name: "Maléfique",
    desc: "Maléfique grandit en menant une vie idyllique, jusqu'à ce qu'une armée d'invasion menace l'harmonie. Lorsque Maléfique devient la protectrice du territoire, elle se retrouve victime d'une trahison impitoyable.",
    img: "maleficent.jpg",
    note: 3,
    vote: 4,
  },
  {
    name: "Once Upon a Time in Hollywood",
    desc: "Rick Dalton, un acteur de télévision qui a déjà vécu de meilleures années, et son cascadeur de longue date Cliff Booth s'efforcent d'atteindre la gloire et le succès dans l'industrie cinématographique au cours de l'âge d'or d'Hollywood en 1969.",
    img: "once_upon.jpg",
    note: 4,
    vote: 7,
  },
  {
    name: "Star Wars, épisode IX : L'Ascension de Skywalker",
    desc: "Un an a passé depuis que Kylo Ren a tué Snoke, le Leader suprême et pris sa place. Bien que largement décimée, la Résistance est prête à renaître de ses cendres. Rey, Poe, Leia et leurs alliés se préparent à reprendre le combat. Mais ils vont devoir faire face à un vieil ennemi : l'empereur Palpatine.",
    img: "starwars.jpg",
    note: 4,
    vote: 10,
  },
  {
    name: "Terminator Renaissance",
    desc: "John Connor est devenu le chef de la résistance dans un monde post-apocalyptique et lutte férocement contre la montée en puissance de Skynet et ses Terminators.",
    img: "terminator.jpg",
    note: 2,
    vote: 3,
  },
];

function App() {
  const [favoriteMoviesCount, setFavoriteMoviesCount] = useState(0);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const addMovieToFavorite = (movieName, movieImg) => {
    setFavoriteMoviesCount(favoriteMoviesCount + 1);
    setFavoriteMovies([
      ...favoriteMovies,
      { name: movieName, img: movieImg, favorite: true },
    ]);
  };

  const removeMovieFromFavorite = (movieName) => {
    setFavoriteMoviesCount(favoriteMoviesCount - 1);
    setFavoriteMovies(favoriteMovies.filter((el) => el.name !== movieName));
  };

  for (let movie of movies) {
    movie.favorite = favoriteMovies.find((e) => e.name === movie.name)
      ? true
      : false;
  }

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
          {movies.map((el, index) => {
            return (
              <Col key={index}>
                <MovieCard
                  key={index}
                  movieName={el.name}
                  movieDesc={el.desc}
                  movieImg={el.img}
                  voteCounter={el.vote}
                  globalRating={el.note}
                  addMovieToFavorite={addMovieToFavorite}
                  removeMovieFromFavorite={removeMovieFromFavorite}
                  isFavorite={el.favorite}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default App;
