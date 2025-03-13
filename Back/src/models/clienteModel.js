const { DataTypes } = require("sequelize");
const db = require("../config/db");

const cliente = db.define(
  "cliente",
  {
    id_cliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo_cliente: { type: DataTypes.STRING },
    nombre_razon_social: { type: DataTypes.STRING, allowNull: false },
    nombre_fantasia: { type: DataTypes.STRING },
    rut: { type: DataTypes.STRING, unique: true },
    giro: { type: DataTypes.STRING },
    direccion: { type: DataTypes.STRING },
    ciudad: { type: DataTypes.STRING },
    comuna: { type: DataTypes.STRING },
    cliente_vigente: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = { cliente };
