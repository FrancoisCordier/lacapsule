var express = require("express");
var router = express.Router();
const axios = require("axios");
const fs = require("fs");

router.get("/", function (req, res) {
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then(function (response) {
      const usersList = response.data;
      let i = 0;
      fs.readdirSync("public/images").forEach((file) => {
        usersList[i].avatar = file;
        i++;
      });

      res.render("index", { usersList });
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.get("/messages", function (req, res) {
  const userId = req.query.id;

  axios
    .get("https://jsonplaceholder.typicode.com/posts", {
      params: {
        userId: userId,
      },
    })
    .then(function (response) {
      const userPosts = response.data;
      res.render("posts", { userPosts });
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});

module.exports = router;
