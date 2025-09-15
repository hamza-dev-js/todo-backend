// models/userModel.js
const db = require("../db");

exports.createUser = (username, hashedPassword, role, cb) => {
  db.query(
    "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
    [username, hashedPassword, role || "user"],
    cb
  );
};

exports.findByUsername = (username, cb) => {
  db.query("SELECT * FROM users WHERE username = ?", [username], (err, results) => {
    if (err) return cb(err);
    cb(null, results[0]);
  });
};

exports.findById = (id, cb) => {
  db.query("SELECT id, username, role FROM users WHERE id = ?", [id], (err, results) => {
    if (err) return cb(err);
    cb(null, results[0]);
  });
};
