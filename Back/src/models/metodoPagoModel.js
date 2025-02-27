const { DataTypes } = require("sequelize");
const db = require("../config/db");

const metodopago = db.define(
  "metodos_pago",
  {
    id_metodo_pago: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Corregido: 'primaryKey' en lugar de 'primarykey'
      autoIncrement: true, // Corregido: 'autoIncrement' en lugar de 'autoincrement'
    },
    nombre_metodo: { type: DataTypes.STRING },
    descripcion: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true, // Corregido: 'freezeTableName' en minúsculas
    timestamps: false,
  }
);

module.exports = { metodopago };
