const { DataTypes } = require("sequelize");
const dbconnection = require("../config/db");

const categoria = dbconnection.define(
  "categoria",
  {
    id_categoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_categoria: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true, // 'freezeTableName' debe estar en minúsculas
    timestamps: false,
  }
);

module.exports = { categoria };
