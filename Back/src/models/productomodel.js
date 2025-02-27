const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { ot } = require("./otmodel");

const producto = db.define(
  "productos",
  {
    id_producto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_ot: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ot,
        key: "id_ot",
      },
    },
    nombre_producto: { type: DataTypes.STRING(255) },
    cantidad_producto: { type: DataTypes.INTEGER },
    precio_unitario: { type: DataTypes.FLOAT },
    recargo_producto: { type: DataTypes.FLOAT },
    descuento_producto: { type: DataTypes.INTEGER },
    af_ex: { type: DataTypes.STRING },
    precio_total: { type: DataTypes.FLOAT },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Definir relación con la OT
producto.belongsTo(ot, { foreignKey: "id_ot" });
ot.hasMany(producto, { foreignKey: "id_ot" });

module.exports = { producto };
