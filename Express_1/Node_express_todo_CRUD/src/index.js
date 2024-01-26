//  import required modules from nodejs and build the server
const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;
// const db = require('./db.json');

let db = { todos: [] };

if (fs.existsSync("db.json")) {
  const data = fs.readFileSync("db.json");
  db = JSON.parse(data);
} else {
  fs.writeFileSync("db.json", JSON.stringify(db));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json(db.todos);
});

app.post("/", (req, res) => {
  const newTodo = req.body;
  // Assuming the request body is { "id": 1, "task": "learn Node", "status": true }
  if (typeof newTodo.id === "number") {
    db.todos.push(newTodo);
    fs.writeFileSync("db.json", JSON.stringify(db));
    res.status(200).json(db.todos);
  } else {
    res.status(400).json({ error: "Invalid argument" });
  }
});

// PUT request to update a todo by ID
app.put("/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const updatedTodo = req.body;

  const index = db.todos.findIndex((todo) => todo.id === todoId);
  if (index !== -1) {
    db.todos[index] = updatedTodo;
    fs.writeFileSync("db.json", JSON.stringify(db));
    res.status(200).json(db.todos);
  } else {
    res.status(400).json({error:`Invalid argument`});
  }
});

// DELETE request to delete a todo by ID
app.delete("/:id", (req, res) => {
  const todoId = parseInt(req.params.id);

  const index = db.todos.findIndex((todo) => todo.id === todoId);
  if (index !== -1) {
    db.todos.splice(index, 1);
    fs.writeFileSync("db.json", JSON.stringify(db));
    res.status(200).json(db.todos);
  } else {
    res.status(400).json({ error: "Invalid argument"});
  }
});

app.listen(port, () => {
  console.log(`TODO API server is listening at ${port}`);
});

// export the server
// eg.module.exports = app;
module.exports = app;
