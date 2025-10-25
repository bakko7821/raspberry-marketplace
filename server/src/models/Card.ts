import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface CardAttributes {
  id: number;
  article: string;
  title: string;
  description?: string;
  price: number;
  about: Record<string, string>;
  images: string[];
}

interface CardCreationAttributes extends Optional<CardAttributes, "id"> {}

class Card extends Model<CardAttributes, CardCreationAttributes>
  implements CardAttributes {
  public id!: number;
  public article!: string;
  public title!: string;
  public description?: string;
  public price!: number;
  public about!: Record<string, string>;
  public images!: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Card.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    article: {
      type: DataTypes.STRING(8),
      allowNull: true,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    about: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    sequelize,
    tableName: "cards",
  }
);

export default Card;
