const mongoose = require("mongoose");

const options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(
  "mongodb+srv://admin:200392@cluster0.cpene.mongodb.net/monbackoffice?retryWrites=true&w=majority",
  options,
  function (err) {
    console.log(err);
  }
);

const contactSchema = mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  age: { type: Number, min: 0, max: 120 },
  type: { type: String, enum: ["Famille", "Amis", "Pro"] },
});

const contactModel = mongoose.model("contacts", contactSchema);

module.exports = contactModel;
