const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory users array
let users = [];

// CREATE User
app.post("/users", (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name
    };

    users.push(user);
    res.status(201).json(user);
});

// READ All Users
app.get("/users", (req, res) => {
    res.json(users);
});

// READ Single User
app.get("/users/:id", (req, res) => {
    const user = users.find(u => u.id == req.params.id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
});

// UPDATE User
app.put("/users/:id", (req, res) => {
    const user = users.find(u => u.id == req.params.id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.name = req.body.name;

    res.json(user);
});

// DELETE User
app.delete("/users/:id", (req, res) => {
    users = users.filter(u => u.id != req.params.id);

    res.json({
        message: "User deleted"
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});