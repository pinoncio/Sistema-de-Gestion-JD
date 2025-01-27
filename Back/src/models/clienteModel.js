const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Cliente = db.define(
  "cliente",
  {
    ID_CLIENTE: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CODIGO_CLIENTE: { type: DataTypes.STRING },
    NOMBRE_RAZON_SOCIAL: { type: DataTypes.STRING, allowNull: false },
    NOMBRE_FANTASIA: { type: DataTypes.STRING },
    RUT: { type: DataTypes.STRING, unique: true },
    GIRO: { type: DataTypes.STRING },
    DIRECCION: { type: DataTypes.STRING },
    CIUDAD: { type: DataTypes.STRING },
    COMUNA: { type: DataTypes.STRING },
    TELEFONO_FIJO: { type: DataTypes.STRING },
    TELEFONO_CELULAR: { type: DataTypes.STRING },
    CORREO_ELECTRONICO: { type: DataTypes.STRING, unique: true },
    CLIENTE_VIGENTE: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = { Cliente };
