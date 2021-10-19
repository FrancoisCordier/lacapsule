var express = require("express");
var router = express.Router();

const devPersons = [
  {
    name: "Leanne Graham",
    sex: "female",
    skills: ["HTML", "CSS"],
    level: "75",
  },
  {
    name: "Ervin Howell",
    sex: "male",
    skills: ["HTML", "NodeJS", "Express"],
    level: "30",
  },
  {
    name: "Clementine Bauch",
    sex: "female",
    skills: ["HTML", "CSS"],
    level: "49",
  },
  {
    name: "Kurtis Weissnat",
    sex: "male",
    skills: ["JavaScript", "jQuery", "NodeJS", "Express"],
    level: "67",
  },
  {
    name: "Chelsey Dietrich",
    sex: "female",
    skills: ["HTML", "CSS", "JavaScript", "NodeJS", "Express"],
    level: "96",
  },
  {
    name: "Dennis Schulist",
    sex: "male",
    skills: ["HTML", "CSS", "JavaScript"],
    level: "54",
  },
];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { devPersons });
});

module.exports = router;
