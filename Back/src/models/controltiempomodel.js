const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { it } = require("./informemodel");

const controltiempo = db.define(
  "control_tiempo",
  {
    id_control_tiempo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_it: {
      type: DataTypes.INTEGER,
      references: {
        model: it,
        key: "id_it",
      },
    },
    dia: { type: DataTypes.STRING(20) },
    fecha: { type: DataTypes.DATEONLY },
    viaje_ida: { type: DataTypes.STRING(10) },
    trabajo: { type: DataTypes.STRING(10) },
    viaje_vuelta: { type: DataTypes.STRING(10) },
    total_hh_viaje: { type: DataTypes.STRING(10) },
    total_hh_trabajo: { type: DataTypes.STRING(10) },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Definir relación con InformeTrabajo
controltiempo.belongsTo(it, { foreignKey: "id_it", as:"informe_trabajo" });
it.hasMany(controltiempo, { foreignKey: "id_it", as:"control_tiempo" });

module.exports = { controltiempo };
