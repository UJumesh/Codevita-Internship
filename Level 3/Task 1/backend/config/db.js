const { Sequelize } = require("sequelize");
require("dotenv").config();

console.log("========== DATABASE CONFIG ==========");
console.log("DB_HOST :", process.env.DB_HOST);
console.log("DB_NAME :", process.env.DB_NAME);
console.log("DB_USER :", process.env.DB_USER);
console.log("=====================================");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: 3306,
    dialect: "mysql",
    logging: console.log,
    dialectOptions: {
      multipleStatements: true
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Connected Successfully");
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error);
  }
};

module.exports = {
  sequelize,
  connectDB
};