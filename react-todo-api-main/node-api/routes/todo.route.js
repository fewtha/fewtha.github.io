module.exports = (app) => {
  const todos = require("../controllers/todo.controller");

  var router = require("express").Router();

  // Create a new todos
  router.post("/", todos.create);

  // Retrieve all todos
  router.get("/", todos.findAll);

  // Retrieve all published todos
  router.get("/done", todos.findAllDone);

  // Retrieve a single todos with id
  router.get("/:id", todos.findOne);

  // Update a todos with id
  router.put("/:id", todos.update);

  // Delete a todos with id
  router.delete("/:id", todos.delete);

  // Delete all todos
  router.delete("/", todos.deleteAll);

  app.use("/api/todo", router);
};
