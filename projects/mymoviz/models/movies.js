const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  title: String,
  img: String,
});

const movieModel = mongoose.model("movies", movieSchema);

module.exports = movieModel;
