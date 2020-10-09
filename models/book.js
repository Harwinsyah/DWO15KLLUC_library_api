"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.belongsTo(models.Category, {
        as: "Category",
        foreignKey: {
          name: "categoryId",
        },
      });
      Book.belongsTo(models.User, {
        as: "User",
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      publication: DataTypes.DATE,
      categoryId: DataTypes.INTEGER,
      author: DataTypes.STRING,
      pages: DataTypes.INTEGER,
      isbn: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      aboutBook: DataTypes.TEXT,
      file: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("Approved", "Waiting", "Cancel"),
        defaultValue: "Approved",
      },
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
