const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

dotenv.config();

const { sequelize, connectDB } = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const skillRoutes = require("./routes/skillRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

const server = http.createServer(app);

// ================= Socket.io =================
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

global.io = io;

let onlineUsers = 0;

io.on("connection", (socket) => {

  onlineUsers++;

  console.log("User connected:", socket.id);

  io.emit("onlineUsers", onlineUsers);

  // Test Notification
  setTimeout(() => {

    socket.emit("receiveNotification", {

      message: "Test notification working 🚀",

      time: new Date().toLocaleTimeString()

    });

    console.log("Test notification sent");

  }, 3000);

  socket.on("disconnect", () => {

    onlineUsers--;

    console.log("User disconnected:", socket.id);

    io.emit("onlineUsers", onlineUsers);

  });

});

// ================= Middleware =================
app.use(cors());
app.use(express.json());

// ================= REST APIs =================
app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/auth", authRoutes);

// ================= GraphQL =================

const jwt = require("jsonwebtoken");

app.use(
  "/graphql",
  graphqlHTTP((req) => {

    let user = null;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {

      const token = authHeader.split(" ")[1];

      try {

        user = jwt.verify(token, process.env.JWT_SECRET);

      } catch (err) {

        console.log("Invalid JWT Token");

      }

    }

    return {

      schema,
      rootValue: resolvers,
      graphiql: true,

      context: {
        user
      }

    };

  })
);
// ================= Home =================
app.get("/", (req, res) => {

  res.json({

    message: "SkillSync API Running 🚀"

  });

});

// ================= Start Server =================
const PORT = process.env.PORT || 5000;

const startServer = async () => {

  try {

    await connectDB();

    await sequelize.sync({
      alter: true
    });

    server.listen(PORT, () => {

      console.log(`🚀 Server running on http://localhost:${PORT}`);

      console.log(`🚀 GraphQL running on http://localhost:${PORT}/graphql`);

    });

  } catch (error) {

    console.error("Server Error:", error);

  }

};

startServer();