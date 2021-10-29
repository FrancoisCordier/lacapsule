const stripe = require("stripe")(
  "sk_test_51JnJugKvErLmbSLAbijVE1VS0JpHapzvZm5W9N5PQ9XrlesoUFgWlne2rI6JhFXa6tAZRoKcLN8jKwskq7odiuLy00J67RrcqJ"
);
const express = require("express");
const router = express.Router();

const YOUR_DOMAIN = "http://localhost:3000";

const dataBike = [
  { name: "BIKO45", price: 679, img: "images/bike-1.jpg", mea: true },
  { name: "ZOOK7", price: 799, img: "images/bike-2.jpg", mea: true },
  { name: "LIKO89", price: 839, img: "images/bike-3.jpg", mea: true },
  { name: "GEWO8", price: 1249, img: "images/bike-4.jpg", mea: false },
  { name: "KIWIT", price: 899, img: "images/bike-5.jpg", mea: false },
  { name: "NASAY", price: 1399, img: "images/bike-6.jpg", mea: false },
];

router.get("/", function (req, res, next) {
  if (!req.session.dataCartBike) {
    req.session.dataCartBike = [];
  }
  res.render("index", { dataBike, dataCartBike: req.session.dataCartBike });
});

router.get("/shop", function (req, res, next) {
  req.session.shippingType = req.session.shippingType
    ? req.session.shippingType
    : "Normal";
  res.render("shop", {
    dataCartBike: req.session.dataCartBike,
    shippingType: req.session.shippingType,
  });
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

  res.redirect("/");
});

router.get("/delete-shop", function (req, res) {
  const modelToDelete = req.query.model;
  let modelToDeleteIndex = req.session.dataCartBike.findIndex((el) => {
    return el.name === modelToDelete;
  });

  req.session.dataCartBike.splice(modelToDeleteIndex, 1);
  res.redirect("shop");
});

router.post("/update-shop", function (req, res) {
  const itemIndex = req.body.index;
  const itemQuantity = req.body.quantity;
  console.log(req.session);
  req.session.dataCartBike[itemIndex].quantity = Number(itemQuantity);

  res.redirect("shop");
});

router.post("/update-shipping", function (req, res) {
  req.session.shippingType = req.body.shippingType;
  console.log(req.session);
  res.redirect("shop");
});

router.post("/create-checkout-session", async (req, res) => {
  const myCart = req.session.dataCartBike;
  const stripeCart = [];
  const shippingRates = req.body.shippingRates;

  for (let item of myCart) {
    stripeCart.push({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    });
  }

  stripeCart.push({
    price_data: {
      currency: "eur",
      product_data: {
        name: "Frais de port",
      },
      unit_amount: shippingRates * 100,
    },
    quantity: 1,
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: stripeCart,
    mode: "payment",
    allow_promotion_codes: true,
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,
  });

  res.redirect(303, session.url);
});

router.get("/success", function (req, res) {
  req.session.destroy();
  res.render("success");
});

router.get("/cancel", function (req, res) {
  res.render("shop", { dataCartBike: req.session.dataCartBike });
});

module.exports = router;
