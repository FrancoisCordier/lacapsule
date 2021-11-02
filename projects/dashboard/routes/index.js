const express = require("express");
const router = express.Router();
const articleModel = require("../models/articles");
const orderModel = require("../models/orders");
const userModel = require("../models/users");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const articlesOutOfStock = await articleModel.find({ stock: 0 });
  const admin = await userModel.findOne({
    status: "admin",
  });
  const unreadMessages = admin.messages.filter((el) => el.read === false);
  const activeTasks = admin.tasks.filter((el) => !el.dateCloture);
  res.render("index", { articlesOutOfStock, unreadMessages, activeTasks });
});

/* GET tasks page. */
router.get("/tasks-page", async function (req, res, next) {
  const userAdmin = await userModel.findOne({ status: "admin" });
  res.render("tasks", { tasks: userAdmin.tasks });
});

/* GET Messages page. */
router.get("/messages-page", async function (req, res, next) {
  const userAdmin = await userModel.findOne({ status: "admin" });
  res.render("messages", { messages: userAdmin.messages });
});

/* GET Users page. */
router.get("/users-page", async function (req, res, next) {
  const users = await userModel.find({ status: "customer" });
  console.log(users);
  res.render("users", { users });
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
