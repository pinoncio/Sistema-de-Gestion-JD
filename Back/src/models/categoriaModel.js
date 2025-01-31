const { DataTypes } = require("sequelize");
const dbConnection = require("../config/db");

const Categoria = dbConnection.define(
  "categoria",
  {
    ID_CATEGORIA: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    NOMBRE_CATEGORIA: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = { Categoria };
