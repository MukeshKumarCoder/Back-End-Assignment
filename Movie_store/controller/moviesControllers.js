const express = require("express");
const movieRouter = express.Router();
const MoviesModel = require("../model/moviesModel");

movieRouter.get("/", async (req, res) => {
  try {
    const query = {};
    if (req.query.title) {
      query.title = new RegExp(req.query.title);
    }
    if (req.query.rating) {
      req.query.rating = { $eq: req.query.rating };
    }

    const page = parseInt(req.query.page) || 1;
    const lilit = parseInt(req.query.lilit) || 10;
    const skip = (page - 1) * lilit;
    const moviesData = await MoviesModel.find(query).skip(skip).lilit(lilit);
    res.send(moviesData);
  } catch (error) {
    res.send({ error: error });
  }
});

movieRouter.post("/addmovie", async (req, res) => {
  try {
    const movies = new MoviesModel(req.body);
    await movies.save();
    res.send(movies);
  } catch (error) {
    res.send({ error: error });
  }
});

movieRouter.patch("/update/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params;
    await MoviesModel.findByIdAndUpdate({ _id: movieId }, req.body);
    res.send({ msg: "movies has been update" });
  } catch (error) {
    res.send({ error: error });
  }
});

movieRouter.delete("/delete/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params;
    await MoviesModel.findByIdAndDelete({ _id: movieId });
    res.send({msg: "Movie has been delete"})
  } catch (error) {
    res.send({ error: error });
  }
});
