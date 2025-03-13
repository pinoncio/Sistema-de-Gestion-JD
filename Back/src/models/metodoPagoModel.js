const { DataTypes } = require("sequelize");
const db = require("../config/db");

const metodopago = db.define(
  "metodos_pago",
  {
    id_metodo_pago: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_metodo: { type: DataTypes.STRING },
    descripcion: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = { metodopago };
