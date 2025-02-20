const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { Cliente } = require("./clienteModel");
const { Insumo } = require("./insumoModel");

const OT = db.define(
  "OT",
  {
    ID_OT: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ID_CLIENTE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cliente,
        key: "ID_CLIENTE",
      },
    },
    ID_INSUMO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Insumo,
        key: "ID_INSUMO",
      },
    },
    TIPO_DOCUMENTO: { type: DataTypes.STRING(50) },
    FECHA_SOLICITUD: { type: DataTypes.DATE, allowNull: false },
    FECHA_ENTREGA: { type: DataTypes.DATE },
    TIPO_OT: { type: DataTypes.STRING(50) },
    EQUIPO: { type: DataTypes.STRING(100) },
    NUMERO_SERIE: { type: DataTypes.STRING(100) },
    HORAS_TRABAJO: { type: DataTypes.INTEGER },
    OBSERVACION_FINAL: { type: DataTypes.TEXT },
    DESCRIPCION: { type: DataTypes.TEXT },
    CANTIDAD: { type: DataTypes.INTEGER, allowNull: false },
    PRECIO_NETO: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    DESCUENTO: { type: DataTypes.DECIMAL(10, 2) },
    RECARGO: { type: DataTypes.DECIMAL(10, 2) },
    AF_EX: { type: DataTypes.STRING(10) },
    SUB_TOTAL: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    COMENTARIO: { type: DataTypes.TEXT },
    DESCUENTO_GLOBAL: { type: DataTypes.DECIMAL(10, 2) },
    MONTO_NETO: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    MONTO_EXENTO: { type: DataTypes.DECIMAL(10, 2) },
    IVA: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    TOTAL: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Definir relaciones con Cliente e Insumo
OT.belongsTo(Cliente, { foreignKey: "ID_CLIENTE" });
Cliente.hasMany(OT, { foreignKey: "ID_CLIENTE" });

OT.belongsTo(Insumo, { foreignKey: "ID_INSUMO" });
Insumo.hasMany(OT, { foreignKey: "ID_INSUMO" });

module.exports = { OT };
