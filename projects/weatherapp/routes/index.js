const express = require("express");
const router = express.Router();
const axios = require("axios");
const cityModel = require("../models/cities");

let alertDisplayExists = "d-none";
let alertDisplayEmpty = "d-none";
let alertDisplayNotFound = "d-none";

router.get("/", function (req, res) {
  console.log(req.session);
  res.render("login");
});

router.get("/weather", async function (req, res, next) {
  if (req.session.username) {
    alertDisplayExists = "d-none";
    alertDisplayEmpty = "d-none";
    alertDisplayNotFound = "d-none";
    let cityList = await cityModel.find();
    res.render("weather", {
      cityList,
      alertDisplayExists,
      alertDisplayEmpty,
      alertDisplayNotFound,
      userName: req.session.username,
    });
  } else {
    res.redirect("/");
  }
});

router.post("/add-city", async function (req, res) {
  const cityName = req.body.cityName.toLowerCase();
  const alreadyExists = await cityModel.findOne({
    name: cityName,
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
      userName: req.session.username,
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
      userName: req.session.username,
    });
  } else {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=fcbe5bcfa5048271a2e9b3aaf5618bba&units=metric&lang=fr`
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
          userName: req.session.username,
        });
      })
      .then(async function (dataAPI) {
        const newCity = new cityModel({
          name: dataAPI.name.toLowerCase(),
          weather: dataAPI.weather[0].description,
          weatherPic: dataAPI.weather[0].icon,
          tmpMin: dataAPI.main.temp_min,
          tmpMax: dataAPI.main.temp_max,
          lon: dataAPI.coord.lon,
          lat: dataAPI.coord.lat,
        });

        const citySaved = await newCity.save();
        cityList = await cityModel.find();

        res.render("weather", {
          cityList,
          alertDisplayExists,
          alertDisplayEmpty,
          alertDisplayNotFound,
          userName: req.session.username,
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
    userName: req.session.username,
  });
});

router.get("/update-data", async function (req, res) {
  let cityList = await cityModel.find();
  alertDisplayExists = "d-none";
  alertDisplayEmpty = "d-none";
  alertDisplayNotFound = "d-none";
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
            userName: req.session.username,
          });
        })
        .catch(async function (error) {
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
      userName: req.session.username,
    });
  }
});

module.exports = router;
