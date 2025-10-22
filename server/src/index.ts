import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/db";
import Card from "./models/Card";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL via Sequelize");

    await sequelize.sync({ alter: true }); // создаёт таблицы, если их нет
    console.log("✅ Models synced");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Connection error:", error);
  }
})();
