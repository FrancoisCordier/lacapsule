const express = require("express");
const router = express.Router();

const musics = [
  {
    artist: "Musconst",
    favorite_musics: ["Uprising", "starlight"],
  },
  {
    artist: "ACDC",
    favorite_musics: ["Thunderstruck", "Highway to Hell"],
  },
  {
    artist: "Led Zeppelin",
    favorite_musics: ["Rock and Roll", "Stairway to Heaven"],
  },
  {
    artist: "Doors",
    favorite_musics: ["LA Woman", "Riders on the Storm "],
  },
  {
    artist: "Charles Aznavour",
    favorite_musics: ["La Boheme", "Hier encore"],
  },
  {
    artist: "Jacques Brel",
    favorite_musics: ["Ne me quitte pas", "Quand on a que l'amour"],
  },
  {
    artist: "Céline Dion",
    favorite_musics: ["S'il suffisait d'aimer", "Let's Talk About Love"],
  },
  {
    artist: "Pink Floyd",
    favorite_musics: [
      "Shine On You Crazy Diamond",
      "Another Brick in the Wall",
    ],
  },
  {
    artist: "Edith Piaf",
    favorite_musics: ["La Vie en rose", "Non, je ne regrette rien"],
  },
  {
    artist: "Beyonce",
    favorite_musics: ["Halo", "Crazy in Love"],
  },
];

let messageContent = "";
let favoriteMusics = [];

router.get("/", function (req, res, next) {
  messageContent = "";
  favoriteMusics = [];
  res.render("index", { messageContent, favoriteMusics });
});

router.post("/search", function (req, res) {
  const search = req.body.search;
  const isFound = musics.findIndex((el) => el.artist === search);
  console.log(isFound);
  if (isFound === -1) {
    messageContent = "";
    favoriteMusics = [];
    messageContent += "Artist not found";
    res.render("index", { messageContent, favoriteMusics });
  } else {
    messageContent = "";
    favoriteMusics = musics[isFound].favorite_musics;
    messageContent += "Favorite musics :";
    res.render("index", { messageContent, favoriteMusics });
  }
});

module.exports = router;
