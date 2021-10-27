var express = require("express");
const contactModel = require("./bdd.js");
var router = express.Router();
require("./bdd.js");

let alert = { display: "d-none", message: "" };

router.get("/", function (req, res, next) {
  alert.display = "d-none";
  res.render("index", { alert });
});

router.post("/add-contact", async function (req, res) {
  try {
    const newContact = new contactModel({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
      age: req.body.age,
      type: req.body.type,
    });

    const contactSaved = await newContact.save();
    alert.display = "";
    alert.message = "Contact added";
    res.render("index", { alert });
  } catch (error) {
    console.log(error);
    alert.display = "";
    alert.message = "Warning ! Email already exists !";
    res.render("index", { alert });
  }
});

router.get("/contact-list", async function (req, res) {
  const contacts = await contactModel.find();
  res.render("contactlist", { contacts });
});

router.get("/update-contact-page", async function (req, res) {
  const contactId = req.query.id;
  const contactToUpdate = await contactModel.findOne({ _id: contactId });

  res.render("updateContact", { contactToUpdate });
});

router.post("/update-contact", async function (req, res) {
  await contactModel.updateOne(
    { _id: req.body.id },
    {
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
      age: req.body.age,
      type: req.body.type,
    }
  );

  const contacts = await contactModel.find();
  res.render("contactlist", { contacts });
});

router.get("/delete-contact", async function (req, res) {
  await contactModel.deleteOne({ _id: req.query.id });

  const contacts = await contactModel.find();
  res.render("contactlist", { contacts });
});

module.exports = router;
