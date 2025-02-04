const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { Categoria } = require("./categoriaModel");

const Insumo = db.define(
  "insumo",
  {
    ID_INSUMO: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TIPO_INSUMO: { type: DataTypes.STRING },
    NOMBRE_INSUMO: { type: DataTypes.STRING, unique: true },
    UBICACION: { type: DataTypes.STRING },
    CANTIDAD: { type: DataTypes.INTEGER },
    COSTO_UNIDAD: { type: DataTypes.FLOAT },
    SUB_TOTAL: { type: DataTypes.FLOAT },
    AJUSTE_ACTUAL: { type: DataTypes.FLOAT },
    STOCK_DISPONIBLE: { type: DataTypes.INTEGER },
    PRECIO_VENTA: { type: DataTypes.FLOAT },
    PRECIO_NETO: { type: DataTypes.FLOAT },
    ESTADO_INSUMO: { type: DataTypes.BOOLEAN, defaultValue: true },
    ID_CATEGORIA: {
      type: DataTypes.INTEGER,
      references: {
        model: Categoria,
        key: "ID_CATEGORIA",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Relación con Categoria
Insumo.belongsTo(Categoria, { foreignKey: "ID_CATEGORIA" });
Categoria.hasMany(Insumo, { foreignKey: "ID_CATEGORIA" });

module.exports = { Insumo };
