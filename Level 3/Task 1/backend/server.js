const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const { sequelize, connectDB } = require("./config/db");
const Skill = require("./models/Skill");
const userRoutes = require("./routes/userRoutes");
const skillRoutes = require("./routes/skillRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/auth", authRoutes);

// Home
app.get("/", (req, res) => {
  res.json({ message: "SkillSync API Running 🚀" });
});

// Start server after DB connect
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: true }); // auto create tables

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server Error:", error);
  }
};

startServer();