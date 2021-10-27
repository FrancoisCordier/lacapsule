const express = require("express");
const router = express.Router();
const axios = require("axios");
require("./bdd.js");
const cityModel = require("./bdd.js");

let alertDisplayExists = "d-none";
let alertDisplayEmpty = "d-none";
let alertDisplayNotFound = "d-none";

router.get("/", async function (req, res, next) {
  alertDisplayExists = "d-none";
  alertDisplayEmpty = "d-none";
  alertDisplayNotFound = "d-none";
  let cityList = await cityModel.find();
  console.log(cityList);
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

router.post("/add-city", async function (req, res) {
  const cityName = req.body.cityName;
  const alreadyExists = await cityModel.findOne({
    name: cityName.toLowerCase(),
  });
  let cityList = await cityModel.find();
  console.log("alreadyExists : ", alreadyExists);
  alertDisplayExists = "d-none";
  alertDisplayEmpty = "d-none";
  alertDisplayNotFound = "d-none";

  if (alreadyExists) {
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
      .then(async function (dataAPI) {
        const newCity = new cityModel({
          name: dataAPI.name.toLowerCase(),
          weather: dataAPI.weather[0].description,
          weatherPic: dataAPI.weather[0].icon,
          tmpMin: dataAPI.main.temp_min,
          tmpMax: dataAPI.main.temp_max,
        });

        const citySaved = await newCity.save();
        cityList = await cityModel.find();

        res.render("weather", {
          cityList,
          alertDisplayExists,
          alertDisplayEmpty,
          alertDisplayNotFound,
        });
      });
  }
});

router.get("/delete-city", async function (req, res) {
  alertDisplayExists = "d-none";
  alertDisplayEmpty = "d-none";
  alertDisplayNotFound = "d-none";
  const cityId = req.query.cityId;
  await cityModel.deleteOne({ _id: cityId });
  let cityList = await cityModel.find();
  res.render("weather", {
    cityList,
    alertDisplayExists,
    alertDisplayEmpty,
    alertDisplayNotFound,
  });
});

router.get("/update-data", async function (req, res) {
  let cityList = await cityModel.find();

  if (cityList.length > 0) {
    for (let city of cityList) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=fcbe5bcfa5048271a2e9b3aaf5618bba&units=metric&lang=fr`
        )
        .then(async function (response) {
          const dataAPI = response.data;
          console.log(dataAPI);
          await cityModel.updateOne(
            { name: city.name },
            {
              weather: dataAPI.weather[0].description,
              weatherPic: dataAPI.weather[0].icon,
              tmpMin: dataAPI.main.temp_min,
              tmpMax: dataAPI.main.temp_max,
            }
          );
          cityList = await cityModel.find();
          res.render("weather", {
            cityList,
            alertDisplayExists,
            alertDisplayEmpty,
            alertDisplayNotFound,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  } else {
    alertDisplayEmpty = "";
    res.render("weather", {
      cityList,
      alertDisplayExists,
      alertDisplayEmpty,
      alertDisplayNotFound,
    });
  }
});

module.exports = router;
