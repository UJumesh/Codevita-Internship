const express = require("express");

const router = express.Router();

const {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillController");

// Create Skill
router.post("/", createSkill);

// Get All Skills
router.get("/", getSkills);

// Get Skill By ID
router.get("/:id", getSkillById);

// Update Skill
router.put("/:id", updateSkill);

// Delete Skill
router.delete("/:id", deleteSkill);

module.exports = router;