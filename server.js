// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./controllers/authController");
const todoRoutes = require("./controllers/todoController");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);    // /api/auth/register , /api/auth/login
app.use("/api/todos", todoRoutes);   // protected routes for todos

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
