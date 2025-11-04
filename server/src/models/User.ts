import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface UserAttributes {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  cart: number[];        // 🆕 массив ID карточек
  favorites: number[];   // 🆕 массив ID карточек
  balance: number;       // 🆕 баланс пользователя
  createdAt?: Date;
  updatedAt?: Date;
}

type UserCreationAttributes = Optional<
  UserAttributes,
  "id" | "avatar" | "cart" | "favorites" | "balance" | "createdAt" | "updatedAt"
>;

class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number;
  public firstname!: string;
  public lastname!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public avatar?: string;
  public cart!: number[];
  public favorites!: number[];
  public balance!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    cart: {
      type: DataTypes.JSON, // можно хранить массив в JSON
      allowNull: false,
      defaultValue: [],
    },
    favorites: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    balance: {
      type: DataTypes.FLOAT, // можно использовать DECIMAL при необходимости
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

export default User;
