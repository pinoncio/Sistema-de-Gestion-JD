const { DataTypes } = require("sequelize");
const dbConnection = require("../config/db");

const Rol = dbConnection.define(
  "rol",
  {
    ID_ROL: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    NOMBRE_ROL: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = { Rol };
