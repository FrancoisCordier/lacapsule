const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/pageTwo", function (req, res, next) {
  req.session.firstName = req.body.firstName;
  res.render("you", { firstName: req.session.firstName });
});

router.get("/pageTree", function (req, res, next) {
  res.render("youagain", { firstName: req.session.firstName });
});

module.exports = router;
