const express = require("express");

const router = express.Router();

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// ==========================
// Create User
// ==========================
router.post("/", createUser);

// ==========================
// Get All Users
// ==========================
router.get("/", getUsers);

// ==========================
// Get User By ID
// ==========================
router.get("/:id", getUserById);

// ==========================
// Update User
// ==========================
router.put("/:id", updateUser);

// ==========================
// Delete User
// ==========================
router.delete("/:id", deleteUser);

module.exports = router;