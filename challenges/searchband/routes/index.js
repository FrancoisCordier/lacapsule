const express = require("express");
const router = express.Router();
const axios = require("axios");

let searchResults = [];
router.get("/", function (req, res, next) {
  searchResults = [];
  res.render("index", { searchResults });
});

router.post("/search", function (req, res) {
  const search = req.body.search;
  searchResults = [];
  axios
    .get(`http://musicbrainz.org/ws/2/artist/?query=artist:${search}`)
    .then(function (response) {
      const dataAPI = response.data.artists;
      for (artist of dataAPI) {
        searchResults.push(artist);
      }
      console.log(searchResults);
      res.render("index", { searchResults });
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.get("/discographie", function (req, res) {
  const artistName = req.query.artistName;

  axios
    .get(`http://musicbrainz.org/ws/2/cdstub/?query=artist:${artistName}`)
    .then(function (response) {
      console.log(response.data);
      const discographie = response.data.cdstubs;
      res.render("discographie", { artistName, discographie });
    });
});

module.exports = router;
