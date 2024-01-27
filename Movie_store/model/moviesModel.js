const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);


const MoviesModel = mongoose.model("movie", movieSchema);

module.exports = MoviesModel;