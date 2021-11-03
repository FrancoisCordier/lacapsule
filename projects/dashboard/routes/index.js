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
router.get("/charts", async function (req, res, next) {
  // Utilisateurs par genre
  const usersPerGender = await userModel.aggregate([
    {
      $group: {
        _id: "$gender",
        userCount: { $sum: 1 },
      },
    },
  ]);

  const femaleCount = usersPerGender.find(
    (el) => el._id === "female"
  ).userCount;

  const maleCount = usersPerGender.find((el) => el._id === "male").userCount;

  // Messages par statut (lu, non lu)
  const messagesReadUnread = await userModel.aggregate([
    { $match: { status: "admin" } },
    {
      $unwind: "$messages",
    },
    {
      $group: {
        _id: "$messages.read",
        count: { $sum: 1 },
      },
    },
  ]);

  const readCount = messagesReadUnread.find((el) => el._id === true).count;
  const unreadCount = messagesReadUnread.find((el) => el._id === false).count;

  // Statut d'expédition pour les commandes payées (expédiées, non expédiées)
  const shippingStatus = await orderModel.aggregate([
    { $match: { status_payment: "validated" } },
    {
      $group: {
        _id: "$status_shipment",
        count: { $sum: 1 },
      },
    },
  ]);

  const shippedOrderCount = shippingStatus.find((el) => el._id === true).count;
  const notShippedOrderCount = shippingStatus.find(
    (el) => el._id === false
  ).count;

  // Chiffre d'affaires
  const revenues = await orderModel.aggregate([
    { $match: { status_payment: "validated" } },
    {
      $group: {
        _id: {
          month: { $month: "$date_payment" },
        },
        total: { $sum: "$total" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  console.log(revenues);
  res.render("charts", {
    femaleCount,
    maleCount,
    readCount,
    unreadCount,
    shippedOrderCount,
    notShippedOrderCount,
    revenues,
  });
});

module.exports = router;
