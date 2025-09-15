// controllers/todoController.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Todo = require("../models/todoModel");

// apply auth middleware to all routes in this router
router.use(auth);

// get todos for current user
router.get("/", (req, res) => {
  Todo.getTodosByUser(req.user.id, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// create todo
router.post("/", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "عنوان مطلوب" });

  Todo.createTodo(req.user.id, title, (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: result.insertId, user_id: req.user.id, title, completed: 0 });
  });
});

// update todo
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  Todo.updateTodo(id, req.user.id, title, completed ? 1 : 0, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id, title, completed: completed ? true : false });
  });
});

// delete todo
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Todo.deleteTodo(id, req.user.id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "تم الحذف" });
  });
});

module.exports = router;
