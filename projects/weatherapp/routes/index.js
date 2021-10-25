var express = require("express");
var router = express.Router();

const cityList = [
  {
    name: "Paris",
    weather: "Nuageux",
    weatherPic: "cloud-sun",
    tmpMin: 3,
    tmpMax: 7,
  },
  {
    name: "Lyon",
    weather: "Ciel dégagé",
    weatherPic: "sun",
    tmpMin: 7,
    tmpMax: 14,
  },
];

let alertDisplay = "d-none";

router.get("/", function (req, res, next) {
  alertDisplay = "d-none";
  res.render("weather", { cityList, alertDisplay });
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/add-city", function (req, res) {
  const cityName = req.body.cityName;
  const alreadyExists = cityList.findIndex((el) => el.name === cityName);
  alertDisplay = "d-none";

  if (alreadyExists > -1) {
    alertDisplay = "";
  } else
    cityList.push({
      name: cityName,
      weather: "Averses",
      weatherPic: "cloud-showers-heavy",
      tmpMin: 1,
      tmpMax: 6,
    });
  res.render("weather", { cityList, alertDisplay });
});

router.get("/delete-city", function (req, res) {
  const cityName = req.query.cityName;
  const cityIndex = cityList.findIndex((el) => el.name === cityName);

  cityList.splice(cityIndex, 1);

  res.render("weather", { cityList, alertDisplay });
});

module.exports = router;
