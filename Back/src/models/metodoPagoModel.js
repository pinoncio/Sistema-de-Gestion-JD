const { DataTypes } = require("sequelize");
const db = require("../config/db");

const MetodoPago = db.define(
  "metodos_pago",
  {
    ID_METODO_PAGO: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    NOMBRE_METODO: { type: DataTypes.STRING },
    DESCRIPCION: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = { MetodoPago };
