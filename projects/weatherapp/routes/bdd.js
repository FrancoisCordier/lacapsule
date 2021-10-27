const mongoose = require("mongoose");

const options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(
  "mongodb+srv://admin:200392@cluster0.cpene.mongodb.net/weatherapp?retryWrites=true&w=majority",
  options,
  function (err) {
    console.log(err);
  }
);

const citySchema = mongoose.Schema({
  name: String,
  weather: String,
  weatherPic: String,
  tmpMin: Number,
  tmpMax: Number,
});

const cityModel = mongoose.model("cities", citySchema);

module.exports = cityModel;
