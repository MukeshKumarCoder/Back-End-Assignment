const express = require("express");
const { connection } = require("./db");
// const bookRouter = require("./controller/bookController")

const app = express();
const port = 4500;

app.use(express.json());
// app.use("/books", bookRouter)

// a) "/" Endpoint: Response: "WELCOME TO BOOKSTORE MANAGEMENT SYSTEM"

app.get("/", async (req, res) => {
  try {
    res.status(200).send({ msg: "WELCOME TO BOOKSTORE MANAGEMENT SYSTEM" });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

app.listen(port, async () => {
  try {
    await connection;
    console.log("app is running successfuly");
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
