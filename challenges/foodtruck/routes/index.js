var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/select-food", function (req, res) {
  const orderedFood = req.query.type;
  res.render("food", { orderedFood });
});

module.exports = router;
