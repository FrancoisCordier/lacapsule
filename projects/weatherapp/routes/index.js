const express = require("express");
const router = express.Router();
const axios = require("axios");

const cityList = [];

let alertDisplayExists = "d-none";
let alertDisplayEmpty = "d-none";
let alertDisplayNotFound = "d-none";

router.get("/", function (req, res, next) {
  alertDisplayExists = "d-none";
  alertDisplayEmpty = "d-none";
  alertDisplayNotFound = "d-none";
  res.render("weather", {
    cityList,
    alertDisplayExists,
    alertDisplayEmpty,
    alertDisplayNotFound,
  });
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/add-city", function (req, res) {
  const cityName = req.body.cityName;
  const alreadyExists = cityList.findIndex(
    (el) => el.name.toLowerCase() === cityName.toLowerCase()
  );
  alertDisplay = "d-none";

  if (alreadyExists > -1) {
    alertDisplayEmpty = "d-none";
    alertDisplayNotFound = "d-none";
    alertDisplayExists = "";
    res.render("weather", {
      cityList,
      alertDisplayEmpty,
      alertDisplayExists,
      alertDisplayNotFound,
    });
  } else if (cityName.length === 0) {
    alertDisplayExists = "d-none";
    alertDisplayNotFound = "d-none";
    alertDisplayEmpty = "";
    res.render("weather", {
      cityList,
      alertDisplayEmpty,
      alertDisplayExists,
      alertDisplayNotFound,
    });
  } else {
    alertDisplayExists = "d-none";
    alertDisplayEmpty = "d-none";
    alertDisplayNotFound = "d-none";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName.toLowerCase()}&appid=fcbe5bcfa5048271a2e9b3aaf5618bba&units=metric&lang=fr`
      )
      .then(function (response) {
        const dataAPI = response.data;
        return dataAPI;
      })
      .catch(function (error) {
        console.log(error);
        alertDisplayNotFound = "";
        res.render("weather", {
          cityList,
          alertDisplayExists,
          alertDisplayEmpty,
          alertDisplayNotFound,
        });
      })
      .then(function (dataAPI) {
        cityList.push({
          name: dataAPI.name,
          weather: dataAPI.weather[0].description,
          weatherPic: dataAPI.weather[0].icon,
          tmpMin: dataAPI.main.temp_min,
          tmpMax: dataAPI.main.temp_max,
        });
        res.render("weather", {
          cityList,
          alertDisplayExists,
          alertDisplayEmpty,
          alertDisplayNotFound,
        });
      });
  }
});

router.get("/delete-city", function (req, res) {
  alertDisplayExists = "d-none";
  alertDisplayEmpty = "d-none";
  alertDisplayNotFound = "d-none";
  const cityName = req.query.cityName;
  const cityIndex = cityList.findIndex((el) => el.name === cityName);

  cityList.splice(cityIndex, 1);

  res.render("weather", {
    cityList,
    alertDisplayExists,
    alertDisplayEmpty,
    alertDisplayNotFound,
  });
});

module.exports = router;
