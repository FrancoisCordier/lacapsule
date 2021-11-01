const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  name: String,
  author: String,
  editor: String,
  year: Number,
});

const bookModel = mongoose.model("books", bookSchema);

module.exports = bookModel;
