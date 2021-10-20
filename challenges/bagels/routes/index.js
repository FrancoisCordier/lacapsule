const express = require("express");
const router = express.Router();

const bagels = [
  {
    name: "Bagel façon Bresse Bleu",
    description:
      "Les fans de fromages bleu vont adorer cette recette de burger aux blancs de poulet et confit d'oignon.",
    img: "images/bagel_bleu.jpg",
  },
  {
    name: "Bagel Pizza",
    description:
      "La pizza Bagel réalise votre rêve le plus fou : une pizza à réaliser en quelques minutes.",
    img: "images/bagel_pizza.jpg",
  },
  {
    name: "Bagel Saumon",
    description:
      "Un délicieux pain rond, ultra moelleux et grillé, garni de saumon fumé et de crème.",
    img: "images/bagel_saumon.jpg",
  },
];

router.get("/", function (req, res, next) {
  res.render("index", { title: "Home Page" });
});

router.get("/bagel", function (req, res) {
  res.render("bagel", { bagels });
});

module.exports = router;
