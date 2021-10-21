const express = require("express");
const router = express.Router();

const dataBike = [
  { name: "BIKO45", price: 679, img: "images/bike-1.jpg" },
  { name: "ZOOK7", price: 799, img: "images/bike-2.jpg" },
  { name: "LIKO89", price: 839, img: "images/bike-3.jpg" },
  { name: "GEWO8", price: 1249, img: "images/bike-4.jpg" },
  { name: "KIWIT", price: 899, img: "images/bike-5.jpg" },
  { name: "NASAY", price: 1399, img: "images/bike-6.jpg" },
];

router.get("/", function (req, res, next) {
  if (!req.session.dataCartBike) {
    req.session.dataCartBike = [];
  }
  res.render("index", { dataBike, dataCartBike: req.session.dataCartBike });
});

router.get("/shop", function (req, res, next) {
  res.render("shop", { dataCartBike: req.session.dataCartBike });
});

router.get("/buy", function (req, res) {
  const modelAddedToCart = req.query.model;
  const foundInCart = req.session.dataCartBike.some((el) => {
    return el.name === modelAddedToCart;
  });
  if (!foundInCart) {
    for (let i = 0; i < dataBike.length; i++) {
      if (modelAddedToCart === dataBike[i].name) {
        req.session.dataCartBike.push(dataBike[i]);
        req.session.dataCartBike[
          req.session.dataCartBike.length - 1
        ].quantity = 1;
      }
    }
  } else {
    let elementFoundIndex = req.session.dataCartBike.findIndex((el) => {
      return el.name === modelAddedToCart;
    });
    req.session.dataCartBike[elementFoundIndex].quantity += 1;
  }

  res.render("index", { dataBike, dataCartBike: req.session.dataCartBike });
});

router.get("/delete-shop", function (req, res) {
  const modelToDelete = req.query.model;
  let modelToDeleteIndex = req.session.dataCartBike.findIndex((el) => {
    return el.name === modelToDelete;
  });

  req.session.dataCartBike.splice(modelToDeleteIndex, 1);
  res.render("shop", { dataCartBike: req.session.dataCartBike });
});

router.post("/update-shop", function (req, res) {
  const itemIndex = req.body.index;
  const itemQuantity = req.body.quantity;

  req.session.dataCartBike[itemIndex].quantity = Number(itemQuantity);

  res.render("shop", { dataCartBike: req.session.dataCartBike });
});
module.exports = router;
