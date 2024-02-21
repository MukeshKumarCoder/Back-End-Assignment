const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.BOOK_URI);

module.exports = connection