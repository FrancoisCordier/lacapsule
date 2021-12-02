var express = require("express");
var router = express.Router();
var fs = require("fs");
const uniqid = require("uniqid");
const cloudinary = require("cloudinary").v2;
const axios = require("axios");

const API_KEY = "5c0a5d392c1745d2ae84dc0b1483bfd2";

cloudinary.config({
  cloud_name: "dwltgninn",
  api_key: "188419274875337",
  api_secret: "Ic8Ai5OdOl8vigvtPFuvOWLF7gI",
  secure: true,
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/upload", async function (req, res) {
  const photo = req.files.photo;
  const uploadPath = `./tmp/${uniqid()}.jpg`;

  await photo.mv(uploadPath);

  await cloudinary.uploader.upload(uploadPath, function (error, result) {
    if (error) console.log(error);
    else {
      fs.unlinkSync(uploadPath);
      axios
        .post("https://lacapsule-faceapi.herokuapp.com/api/detect", {
          apiKey: API_KEY,
          image: result.url,
        })
        .then((response) => {
          console.log(response.data);

          if (response.data.result) {
            res.json({
              photoURL: result.url,
              detectionResults: response.data.detectedFaces,
            });
          } else {
            res.json({
              photoURL: result.url,
              detectionError: response.data.error,
            });
          }
        })
        .catch((e) => console.log(e));
    }
  });
});

module.exports = router;
