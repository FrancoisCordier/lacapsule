const express = require("express");
const router = express.Router();

const products = [
  {
    name: "Apple watch",
    price: 300,
    image: "apple-watch",
  },
  {
    name: "Porte document",
    price: 76,
    image: "porte-doc",
  },
  {
    name: "DJI mavic air",
    price: 989,
    image: "dji-mavic-air",
  },
  {
    name: "Oculus",
    price: 342,
    image: "oculus",
  },
  {
    name: "Bose QC35",
    price: 155,
    image: "bose-qc35",
  },
  {
    name: "Xiaomi-m365",
    price: 674,
    image: "xiaomi-m365",
  },
  {
    name: "BRIG Eagle 380",
    price: 15500,
    image: "BRIG-Eagle-380",
  },
  {
    name: "Linda Razer",
    price: 897,
    image: "linda",
  },
  {
    name: "Fort 500",
    price: 67,
    image: "fort-500",
  },
  {
    name: "OnePlus 6",
    price: 540,
    image: "one-plus6",
  },
];

router.get("/", function (req, res, next) {
  if (!req.session.myCart) {
    req.session.myCart = [];
    res.render("index", { products, myCart: req.session.myCart });
  } else {
    res.render("index", { products, myCart: req.session.myCart });
  }
});

router.get("/buy", function (req, res) {
  const idArticle = req.query.idArticle;
  const articleName = req.query.articleName;
  const foundInCart = req.session.myCart.some((el) => {
    return el.name === articleName;
  });

  if (!foundInCart) {
    req.session.myCart.push(products[idArticle]);
    req.session.myCart[req.session.myCart.length - 1].quantity = 1;
  } else {
    req.session.myCart[idArticle].quantity += 1;
  }

  res.render("index", { products, myCart: req.session.myCart });
});

router.get("/basket", function (req, res, next) {
  res.render("basket", { myCart: req.session.myCart });
});

module.exports = router;
