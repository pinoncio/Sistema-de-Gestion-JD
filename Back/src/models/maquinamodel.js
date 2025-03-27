const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { cliente } = require("./clientemodel");

const maquina = db.define(
  "maquinas",
  {
    id_maquina: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: cliente,
        key: "id_cliente",
      },
    },
    nombre_maquina: { type: DataTypes.STRING(255), allowNull: false },
    modelo_maquina: { type: DataTypes.STRING(255) },
    numero_serie: { type: DataTypes.STRING(100), unique: true },
    numero_motor: { type: DataTypes.STRING(100), unique: true },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Relación con cliente
maquina.belongsTo(cliente, { foreignKey: "id_cliente" });
cliente.hasMany(maquina, { foreignKey: "id_cliente" });

module.exports = { maquina };
