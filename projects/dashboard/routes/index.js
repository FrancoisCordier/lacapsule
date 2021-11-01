const express = require("express");
const router = express.Router();
const articleModel = require("../models/articles");
const orderModel = require("../models/orders");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

/* GET tasks page. */
router.get("/tasks-page", function (req, res, next) {
  res.render("tasks");
});

/* GET Messages page. */
router.get("/messages-page", function (req, res, next) {
  res.render("messages");
});

/* GET Users page. */
router.get("/users-page", function (req, res, next) {
  res.render("users");
});

/* GET Catalog page. */
router.get("/catalog-page", async function (req, res, next) {
  const articles = await articleModel.find();
  res.render("catalog", { articles });
});

/* GET Orders-list page. */
router.get("/orders-list-page", async function (req, res, next) {
  const orders = await orderModel.find();
  res.render("orders-list", { orders });
});

/* GET Order detail page. */
router.get("/order-page", async function (req, res, next) {
  const orderId = req.query.orderId;
  const order = await orderModel.findById(orderId).populate("articles");
  console.log(order);
  res.render("order", { order });
});

/* GET chart page. */
router.get("/charts", function (req, res, next) {
  res.render("charts");
});

module.exports = router;
