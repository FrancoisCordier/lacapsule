var express = require("express");
var router = express.Router();

const mongoose = require("mongoose");

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// --------------------- BDD -----------------------------------------------------

mongoose.connect(
  "mongodb+srv://admin:200392@cluster0.cpene.mongodb.net/mongoproducts?retryWrites=true&w=majority",
  options,
  function (err) {
    if (err) {
      console.log(
        `error, failed to connect to the database because --> ${err}`
      );
    } else {
      console.info("*** Database connection : Success ***");
    }
  }
);

var productSchema = mongoose.Schema({
  name: String,
  stock: Number,
  isOnline: Boolean,
  category: String,
});

var productModel = mongoose.model("products", productSchema);

var categories = ["Books", "Toys", "Computers", "Food"];
var online = [true, false];

/* GET home page. */
router.get("/", async function (req, res, next) {
  const products = await productModel.find();
  const categories = await productModel.find().distinct("category");
  const stocks = await productModel.find().distinct("stock");
  res.render("index", { products, categories, stocks });
});

// Remplissage de la base de donnée, une fois suffit
router.get("/save", async function (req, res, next) {
  // How many products we want
  var count = 50;

  // Save  ---------------------------------------------------
  for (var i = 0; i < count; i++) {
    productCategory =
      categories[Math.floor(Math.random() * Math.floor(categories.length))];
    isOnline = online[Math.floor(Math.random() * Math.floor(online.length))];
    productName =
      productCategory + Math.floor(Math.random() * Math.floor(100000));

    var newProduct = new productModel({
      name: productName,
      stock: Math.floor(Math.random() * Math.floor(1000)),
      isOnline: isOnline,
      category: productCategory,
    });

    await newProduct.save();
  }
  res.render("index", { title: "Express" });
});

router.post("/filter", async function (req, res) {
  const categories = await productModel.find().distinct("category");
  const stocks = await productModel.find().distinct("stock");
  const category =
    req.body.category === "Books,Computers,Food,Toys"
      ? req.body.category.split(",")
      : req.body.category;

  const isOnline =
    req.body.isOnline === "true,false"
      ? req.body.isOnline.split(",")
      : req.body.isOnline;

  const minRange = req.body.minRange;
  const maxRange = req.body.maxRange;

  const products = await productModel.find({
    category: { $in: category },
    isOnline: { $in: isOnline },
    stock: { $gte: minRange, $lte: maxRange },
  });

  res.render("index", { products, categories, stocks });
});

module.exports = router;
