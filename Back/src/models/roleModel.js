const { DataTypes } = require("sequelize");
const dbconnection = require("../config/db");

const rol = dbconnection.define(
  "rol",
  {
    id_rol: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_rol: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = { rol };
