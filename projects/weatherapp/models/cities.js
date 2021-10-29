const mongoose = require("mongoose");

const citySchema = mongoose.Schema({
  name: String,
  weather: String,
  weatherPic: String,
  tmpMin: Number,
  tmpMax: Number,
});

const cityModel = mongoose.model("cities", citySchema);

module.exports = cityModel;