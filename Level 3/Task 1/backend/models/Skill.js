const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Skill = sequelize.define(
  "Skill",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    skillName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    level: {
      type: DataTypes.ENUM(
        "Beginner",
        "Intermediate",
        "Advanced"
      ),
      defaultValue: "Beginner",
    },

    progress: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = Skill;