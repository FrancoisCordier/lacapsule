const mongoose = require("mongoose");

const mealSchema = mongoose.Schema({
  meal: String,
  name: String,
  delivery: String,
  adress: String,
  phone: String,
  beverage: String,
});

const mealModel = mongoose.model("meals", mealSchema);

module.exports = mealModel;
