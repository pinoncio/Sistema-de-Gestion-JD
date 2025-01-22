const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Usuario = db.define(
  "usuario",
  {
    ID_USUARIO: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    NOMBRE1_USUARIO: { type: DataTypes.STRING },
    NOMBRE2_USUARIO: { type: DataTypes.STRING },
    APELLIDO1_USUARIO: { type: DataTypes.STRING },
    APELLIDO2_USUARIO: { type: DataTypes.STRING },
    RUT_USUARIO: { type: DataTypes.STRING },
    CONTRASENIA_USUARIO: { type: DataTypes.STRING },
    EMAIL_USUARIO: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = { Usuario };
