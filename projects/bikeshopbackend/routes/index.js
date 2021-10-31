const stripe = require("stripe")(
  "sk_test_51JnJugKvErLmbSLAbijVE1VS0JpHapzvZm5W9N5PQ9XrlesoUFgWlne2rI6JhFXa6tAZRoKcLN8jKwskq7odiuLy00J67RrcqJ"
);
const express = require("express");
const router = express.Router();
const getShippingMode = require("../helpers/getShippingMode");
const getTotalCart = require("../helpers/getTotalCart");

const DOMAIN = "http://localhost:3000";

const couponCodes = [
  { code: "REDUC25", type: "percent", value: 25 },
  { code: "REDUC50", type: "percent", value: 50 },
  { code: "FIRSTTIME", type: "fixed", value: 100 },
];
const dataBike = [
  {
    name: "BIKO45",
    price: 679,
    img: "images/bike-1.jpg",
    mea: false,
    shipping: [1, 2],
    stock: 0,
  },
  {
    name: "ZOOK7",
    price: 799,
    img: "images/bike-2.jpg",
    mea: false,
    shipping: [1, 3],
    stock: 1,
  },
  {
    name: "LIKO89",
    price: 839,
    img: "images/bike-3.jpg",
    mea: false,
    shipping: [1, 2, 3],
    stock: 2,
  },
  {
    name: "GEWO8",
    price: 1249,
    img: "images/bike-4.jpg",
    mea: false,
    shipping: [1, 3],
    stock: 3,
  },
  {
    name: "KIWIT",
    price: 899,
    img: "images/bike-5.jpg",
    mea: false,
    shipping: [1, 2],
    stock: 4,
  },
  {
    name: "NASAY",
    price: 1399,
    img: "images/bike-6.jpg",
    mea: false,
    shipping: [1, 2, 3],
    stock: 5,
  },
];

router.get("/", function (req, res, next) {
  if (!req.session.dataCartBike) {
    req.session.dataCartBike = [];
  }

  res.render("index", { dataBike, dataCartBike: req.session.dataCartBike });
});

router.get("/shop", function (req, res, next) {
  const shippingModes = getShippingMode(req.session.dataCartBike);

  if (req.session.shippingSelected == undefined) {
    req.session.shippingSelected = shippingModes[0];
  }

  // if (!req.session.couponCode) {
  //   req.session.couponCode = {};
  // }

  req.session.shippingSelected = shippingModes.find(
    (el) => el.name === req.session.shippingSelected.name
  );

  const totalOrder = getTotalCart(
    req.session.dataCartBike,
    req.session.shippingSelected,
    req.session.couponCode
  );

  console.log(totalOrder);

  res.render("shop", {
    dataCartBike: req.session.dataCartBike,
    shippingModes,
    shippingSelected: req.session.shippingSelected,
    totalCart: totalOrder.totalCart,
    totalDiscount: totalOrder.totalDiscount,
    shippingRates: totalOrder.shippingRates,
    hasDiscount: totalOrder.hasDiscount,
    couponCode: req.session.couponCode,
    dataBike,
  });
});

router.get("/buy", function (req, res) {
  const dataCartBike = req.session.dataCartBike;
  const modelAddedToCart = req.query.model;
  const foundInCart = req.session.dataCartBike.some((el) => {
    return el.name === modelAddedToCart;
  });

  if (
    dataBike[dataBike.findIndex((el) => el.name === modelAddedToCart)].stock ===
    0
  ) {
    res.redirect("/");
  } else {
    if (!foundInCart) {
      for (let i = 0; i < dataBike.length; i++) {
        if (modelAddedToCart === dataBike[i].name) {
          dataCartBike.push(dataBike[i]);
          dataCartBike[dataCartBike.length - 1].quantity = 1;
          dataBike[i].stock -= 1;
        }
      }
    } else {
      let elementFoundIndex = dataCartBike.findIndex(
        (el) => el.name === modelAddedToCart
      );
      dataCartBike[elementFoundIndex].quantity += 1;
      dataCartBike[elementFoundIndex].stock -= 1;
      dataBike[
        dataBike.findIndex((el) => el.name === modelAddedToCart)
      ].stock -= 1;
    }

    res.redirect("/");
  }
});

router.get("/delete-shop", function (req, res) {
  const modelToDelete = req.query.model;
  const dataCartBike = req.session.dataCartBike;
  let modelToDeleteIndex = req.session.dataCartBike.findIndex((el) => {
    return el.name === modelToDelete;
  });

  dataBike[dataBike.findIndex((el) => el.name === modelToDelete)].stock +=
    dataCartBike[
      dataCartBike.findIndex((el) => el.name === modelToDelete)
    ].quantity;

  dataCartBike.splice(modelToDeleteIndex, 1);
  res.redirect("shop");
});

router.post("/update-shop", function (req, res) {
  const itemIndex = req.body.index;
  const itemQuantity = req.body.quantity;
  const modelToUpdate = req.body.model;
  const dataCartBike = req.session.dataCartBike;
  dataBike[dataBike.findIndex((el) => el.name === modelToUpdate)].stock +=
    dataCartBike[dataCartBike.findIndex((el) => el.name === modelToUpdate)]
      .quantity - itemQuantity;

  dataCartBike[itemIndex].stock +=
    dataCartBike[itemIndex].quantity - itemQuantity;
  dataCartBike[itemIndex].quantity = Number(itemQuantity);

  res.redirect("shop");
});

router.post("/update-shipping", function (req, res) {
  const shippingModes = getShippingMode(req.session.dataCartBike);
  req.session.shippingSelected = shippingModes.find(
    (el) => el.name === req.body.shippingMode
  );
  res.redirect("shop");
});

router.post("/apply-coupon", function (req, res) {
  const couponCode = req.body.couponCode;
  const couponExists = couponCodes.find((el) => el.code === couponCode);

  if (couponExists) {
    req.session.couponCode = couponExists;
    res.redirect("/shop");
  } else {
    res.redirect("/shop");
  }
});

router.post("/delete-coupon", function (req, res) {
  delete req.session.couponCode;
  res.redirect("/shop");
});

router.post("/create-checkout-session", async (req, res) => {
  const myCart = req.session.dataCartBike;
  const stripeCart = [];
  const shippingRates = req.session.shippingSelected.value;
  const couponCode = req.session.couponCode;
  console.log(req.session);

  for (let item of myCart) {
    if (couponCode && couponCode.type === "percent") {
      if (item.quantity >= 2) {
        stripeCart.push({
          price_data: {
            currency: "eur",
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(
              (item.price - (0.2 * item.price) / item.quantity) *
                100 *
                (1 - couponCode.value / 100)
            ),
          },
          quantity: item.quantity,
        });
      } else {
        stripeCart.push({
          price_data: {
            currency: "eur",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100 * (1 - couponCode.value / 100),
          },
          quantity: item.quantity,
        });
      }
    } else {
      if (item.quantity >= 2) {
        stripeCart.push({
          price_data: {
            currency: "eur",
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(
              (item.price - (0.2 * item.price) / item.quantity) * 100
            ),
          },
          quantity: item.quantity,
        });
      } else {
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
    }
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
    success_url: `${DOMAIN}/success`,
    cancel_url: `${DOMAIN}/cancel`,
  });

  res.redirect(303, session.url);
});

router.get("/success", function (req, res) {
  req.session.destroy();
  res.render("success");
});

router.get("/cancel", function (req, res) {
  res.redirect("shop");
});

module.exports = router;
