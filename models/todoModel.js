// models/todoModel.js
const db = require("../db");

exports.getTodosByUser = (userId, cb) => {
  db.query("SELECT * FROM todos WHERE user_id = ?", [userId], cb);
};

exports.createTodo = (userId, title, cb) => {
  db.query("INSERT INTO todos (user_id, title) VALUES (?, ?)", [userId, title], cb);
};

exports.updateTodo = (id, userId, title, completed, cb) => {
  db.query(
    "UPDATE todos SET title = ?, completed = ? WHERE id = ? AND user_id = ?",
    [title, completed, id, userId],
    cb
  );
};

exports.deleteTodo = (id, userId, cb) => {
  db.query("DELETE FROM todos WHERE id = ? AND user_id = ?", [id, userId], cb);
};
