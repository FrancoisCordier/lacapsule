const express = require("express");
const router = express.Router();
const bookModel = require("../models/books");
const readerModel = require("../models/readers");

router.get("/", async function (req, res, next) {
  const readers = await readerModel.find();
  const books = await bookModel.find();
  res.render("index", { readers, books });
});

router.get("/readers", async function (req, res) {
  const readers = await readerModel.find().populate("favoriteBooks");
  res.render("readers", { readers });
});

router.post("/add-reader", async function (req, res) {
  const readerName = req.body.readerName;
  const newReader = new readerModel({
    name: readerName,
  });

  await newReader.save();
  res.redirect("/");
});

router.post("/add-book", async function (req, res) {
  const bookTitle = req.body.bookTitle;
  const bookAuthor = req.body.bookAuthor;
  const bookEditor = req.body.bookEditor;
  const bookYear = req.body.bookYear;

  const newBook = new bookModel({
    name: bookTitle,
    author: bookAuthor,
    editor: bookEditor,
    year: bookYear,
  });

  await newBook.save();

  res.redirect("/");
});

router.post("/add-favorite", async function (req, res) {
  const readerId = req.body.readerId;
  const bookId = req.body.bookId;

  await readerModel.findByIdAndUpdate(readerId, {
    $push: { favoriteBooks: bookId },
  });

  res.redirect("/");
});

module.exports = router;
