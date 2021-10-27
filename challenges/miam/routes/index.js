const express = require("express");
const router = express.Router();
require("../models/bdd.js");

const mealModel = require("../models/meals.js");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/order", async function (req, res) {
  const newMeal = new mealModel({
    meal: req.body.meal,
    name: req.body.name,
    delivery: req.body.delivery,
    adress: req.body.adress,
    phone: req.body.phone,
    beverage: req.body.beverage,
  });

  const mealSaved = await newMeal.save();
  console.log(mealSaved);
});
module.exports = router;
