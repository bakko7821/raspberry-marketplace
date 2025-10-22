import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: process.env.DB_NAME || "mydb",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "password",
  host: process.env.DB_HOST || "localhost",
  dialect: "postgres",
  logging: false,
});

export default sequelize;
