const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { categoria } = require("./categoriamodel");

const insumo = db.define(
  "insumo",
  {
    id_insumo: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Corregido: 'primaryKey' en lugar de 'primarykey'
      autoIncrement: true, // Corregido: 'autoIncrement' en lugar de 'autoincrement'
    },
    tipo_insumo: { type: DataTypes.STRING },
    nombre_insumo: { type: DataTypes.STRING, unique: true },
    ubicacion: { type: DataTypes.STRING },
    cantidad: { type: DataTypes.INTEGER },
    costo_unidad: { type: DataTypes.FLOAT },
    sub_total: { type: DataTypes.FLOAT },
    ajuste_actual: { type: DataTypes.FLOAT },
    stock_disponible: { type: DataTypes.INTEGER },
    precio_venta: { type: DataTypes.FLOAT },
    precio_neto: { type: DataTypes.FLOAT },
    estado_insumo: { type: DataTypes.BOOLEAN, defaultValue: true }, // Corregido: 'defaultValue' en lugar de 'defaultvalue'
    id_categoria: {
      type: DataTypes.INTEGER,
      references: {
        model: categoria,
        key: "id_categoria",
      },
    },
  },
  {
    freezeTableName: true, // Corregido: 'freezeTableName' en minúsculas
    timestamps: false,
  }
);

// Relación con categoria
insumo.belongsTo(categoria, { foreignKey: "id_categoria" }); // Corregido: 'foreignKey' en lugar de 'foreignkey'
categoria.hasMany(insumo, { foreignKey: "id_categoria" }); // Corregido: 'foreignKey' en lugar de 'foreignkey'

module.exports = { insumo };
