const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { ot } = require("./otmodel");
const { insumo } = require("./insumomodel");

const otinsumo = db.define(
  "ot_insumo",
  {
    id_ot: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
      references: {
        model: ot,
        key: "id_ot",
      },
    },
    id_insumo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: insumo,
        key: "id_insumo",
      },
    },
    cantidad_insumo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio_unitario: {
      type: DataTypes.FLOAT,
    },
    descuento_insumo: {
      type: DataTypes.FLOAT,
    },
    recargo_insumo: {
      type: DataTypes.FLOAT,
    },
    af_ex_insumo: {
      type: DataTypes.STRING(10),
    },
    precio_total: {
      type: DataTypes.FLOAT,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

ot.hasMany(otinsumo, {
  foreignKey: "id_ot",
  as: "ot_insumo",
});

otinsumo.belongsTo(ot, {
  foreignKey: "id_ot",
  as: "ot",
});

insumo.hasMany(otinsumo, {
  foreignKey: "id_insumo",
  as: "ot_insumo",
});

otinsumo.belongsTo(insumo, {
  foreignKey: "id_insumo",
  as: "insumo",
});

module.exports = { otinsumo };
