const { DataTypes } = require("sequelize");
const db = require("../config/db");

const cliente = db.define(
  "cliente",
  {
    id_cliente: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Corregido: 'primaryKey' en lugar de 'primarykey'
      autoIncrement: true, // Corregido: 'autoIncrement' en lugar de 'autoincrement'
    },
    codigo_cliente: { type: DataTypes.STRING },
    nombre_razon_social: { type: DataTypes.STRING, allowNull: false }, // Corregido: 'allowNull' en lugar de 'allownull'
    nombre_fantasia: { type: DataTypes.STRING },
    rut: { type: DataTypes.STRING, unique: true },
    giro: { type: DataTypes.STRING },
    direccion: { type: DataTypes.STRING },
    ciudad: { type: DataTypes.STRING },
    comuna: { type: DataTypes.STRING },
    cliente_vigente: { type: DataTypes.BOOLEAN, defaultValue: true }, // Corregido: 'defaultValue' en lugar de 'defaultvalue'
  },
  {
    freezeTableName: true, // Corregido: 'freezeTableName' en minúsculas
    timestamps: false,
  }
);

module.exports = { cliente };
