const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { ot } = require("./otmodel"); // importa el modelo ot
const { insumo } = require("./insumomodel"); // importa el modelo insumo

const otinsumo = db.define(
  "ot_insumo",
  {
    id_ot: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Corregido: 'primaryKey' en lugar de 'primarykey'
      allowNull: true, // Corregido: 'allowNull' en lugar de 'allownull'
      references: {
        model: ot,
        key: "id_ot",
      },
    },
    id_insumo: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Corregido: 'primaryKey' en lugar de 'primarykey'
      allowNull: false, // Corregido: 'allowNull' en lugar de 'allownull'
      references: {
        model: insumo,
        key: "id_insumo",
      },
    },
    cantidad_insumo: {
      type: DataTypes.INTEGER,
      allowNull: false, // Corregido: 'allowNull' en lugar de 'allownull'
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
    freezeTableName: true, // Corregido: 'freezeTableName' en minúsculas
    timestamps: false,
  }
);

// Relación entre ot e otinsumo
ot.hasMany(otinsumo, {
  foreignKey: "id_ot", // Corregido: 'foreignKey' en lugar de 'foreignkey'
  as: "ot_insumo", // alias para acceder a los insumos de la ot
});

// Relación entre otinsumo e ot
otinsumo.belongsTo(ot, {
  foreignKey: "id_ot", // Corregido: 'foreignKey' en lugar de 'foreignkey'
  as: "ot", // alias para acceder a la ot desde otinsumo
});

// Relación entre insumo e otinsumo
insumo.hasMany(otinsumo, {
  foreignKey: "id_insumo", // Corregido: 'foreignKey' en lugar de 'foreignkey'
  as: "ot_insumo", // alias para acceder a las otinsumos del insumo
});

// Relación entre otinsumo e insumo
otinsumo.belongsTo(insumo, {
  foreignKey: "id_insumo", // Corregido: 'foreignKey' en lugar de 'foreignkey'
  as: "insumo", // alias para acceder al insumo desde otinsumo
});

module.exports = { otinsumo };
