const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const movieModel = require("../models/movies");

const API_KEY = "f03a375e43d6ecc93eb59f9ff0c375d3";

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/new-movies", function (req, res) {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1&region=FR`
    )
    .then((response) => {
      res.json(response.data);
    });
});

router.get("/favorite", async function (req, res) {
  const favoriteMovies = await movieModel.find();

  res.json(favoriteMovies);
});

router.post("/add-favorite", async function (req, res) {
  const movieName = req.body.movieName;
  const movieImg = req.body.movieImg;

  const newFavoriteMovie = new movieModel({
    title: movieName,
    img: movieImg,
  });

  await newFavoriteMovie.save();

  res.json({ Added: true });
});

router.delete("/remove-favorite/:movieName", async function (req, res) {
  const movieName = req.params.movieName;

  await movieModel.deleteOne({ title: movieName });

  res.json({ Removed: true });
});

module.exports = router;
