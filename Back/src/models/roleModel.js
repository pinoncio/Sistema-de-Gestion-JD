const { DataTypes } = require("sequelize");
const dbconnection = require("../config/db");

const rol = dbconnection.define(
  "rol",
  {
    id_rol: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Corregido: 'primaryKey' y 'autoIncrement'
    nombre_rol: { type: DataTypes.STRING }, // Corregido: 'DataTypes.STRING' en lugar de 'datatypes.string'
  },
  {
    freezeTableName: true, // Corregido: 'freezeTableName' en minúsculas
    timestamps: false,
  }
);

module.exports = { rol };
