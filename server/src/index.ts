import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/db";
import Card from "./models/Card";
import authRoutes from "./routes/auth";
import cardsRoutes from "./routes/cards";
import usersRoutes from "./routes/users";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/cards", cardsRoutes);
app.use("/api/users", usersRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
