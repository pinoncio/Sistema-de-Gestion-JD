const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { ot } = require("./otmodel");
const { gasto } = require("./gastomodel"); // Cambié 'costo' por 'gasto'

const otgasto = db.define(
  "ot_gasto", // Cambié 'ot_costo' por 'ot_gasto'
  {
    id_ot: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: ot,
        key: "id_ot",
      },
      allowNull: true,
    },
    id_gasto: {
      // Cambié 'id_costo' por 'id_gasto'
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: gasto, // Cambié 'costo' por 'gasto'
        key: "id_gasto", // Cambié 'id_costo' por 'id_gasto'
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Relacionamos OT con Gastos (Muchos a Muchos)
ot.belongsToMany(gasto, { through: otgasto, foreignKey: "id_ot" });
gasto.belongsToMany(ot, { through: otgasto, foreignKey: "id_gasto" });

module.exports = { otgasto }; // Cambié 'otcosto' por 'otgasto'
