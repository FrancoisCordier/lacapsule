const express = require("express");
const router = express.Router();
const userModel = require("../models/users");

router.post("/sign-up", async function (req, res) {
  const isAlreadyRegistered = await userModel.findOne({
    email: req.body.email,
  });

  if (isAlreadyRegistered) {
    res.redirect("/");
  } else {
    const newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const userSaved = await newUser.save();
    req.session.userId = userSaved._id;
    req.session.username = userSaved.username;
    res.redirect("/weather");
  }
});

router.post("/sign-in", async function (req, res) {
  const isUserFound = await userModel.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (isUserFound) {
    req.session.userId = isUserFound._id;
    req.session.username = isUserFound.username;
    console.log(req.session);
    res.redirect("/weather");
  } else res.render("login");
});

router.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
