var express = require("express");
var router = express.Router();

const dataBike = [
  { name: "BIKO45", price: 679, img: "images/bike-1.jpg" },
  { name: "ZOOK7", price: 799, img: "images/bike-2.jpg" },
  { name: "LIKO89", price: 839, img: "images/bike-3.jpg" },
  { name: "GEWO8", price: 1249, img: "images/bike-4.jpg" },
  { name: "KIWIT", price: 899, img: "images/bike-5.jpg" },
  { name: "NASAY", price: 1399, img: "images/bike-6.jpg" },
];

let dataCartBike = [
  { name: "BIKO45", price: 679, img: "images/bike-1.jpg", quantity: 2 },
  { name: "LIKO89", price: 839, img: "images/bike-3.jpg", quantity: 1 },
  { name: "GEWO8", price: 1249, img: "images/bike-4.jpg", quantity: 1 },
]

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {dataBike});
});

router.get("/shop", function (req, res, next) {
  res.render("shop", {dataCartBike});
});

module.exports = router;
