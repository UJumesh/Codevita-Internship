const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// =========================
// Middleware
// =========================
app.use(cors());
app.use(express.json());

// =========================
// Home Route
// =========================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to SkillSync Authentication API 🚀",
  });
});

// =========================
// Authentication Routes
// =========================
app.use("/api/auth", authRoutes);

// =========================
// 404 Route
// =========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// =========================
// Start Server
// =========================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});