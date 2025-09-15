// controllers/authController.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// register
router.post("/register", (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) return res.status(400).json({ message: "الرجاء تعبئة الحقول" });

  User.findByUsername(username, (err, user) => {
    if (err) return res.status(500).json(err);
    if (user) return res.status(400).json({ message: "اسم المستخدم موجود" });

    bcrypt.hash(password, 10, (err, hashed) => {
      if (err) return res.status(500).json(err);
      User.createUser(username, hashed, role || "user", (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "تم التسجيل" });
      });
    });
  });
});

// login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "الرجاء تعبئة الحقول" });

  User.findByUsername(username, (err, user) => {
    if (err) return res.status(500).json(err);
    if (!user) return res.status(401).json({ message: "المستخدم غير موجود" });

    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return res.status(500).json(err);
      if (!match) return res.status(401).json({ message: "كلمة المرور غير صحيحة" });

      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, {
        expiresIn: "8h"
      });
      res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
    });
  });
});

module.exports = router;
