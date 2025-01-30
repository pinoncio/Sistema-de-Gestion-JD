const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { Cliente } = require("./clienteModel");

const InformacionDePago = db.define(
  "informacion_de_pago",
  {
    ID_INFORMACION: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ID_CLIENTE: {
      type: DataTypes.INTEGER,
      references: {
        model: Cliente, // Hace referencia al modelo Cliente
        key: "ID_CLIENTE",
      },
      allowNull: false, // La relación con el cliente no debe ser nula
    },
    NOMBRE_RESPONSABLE: { 
      type: DataTypes.STRING,
      allowNull: true, // Permite valores nulos
    },
    CORREO_ELECTRONICO: { 
      type: DataTypes.STRING,
      allowNull: true, // Permite valores nulos
    },
    TELEFONO_RESPONSABLE: { 
      type: DataTypes.STRING,
      allowNull: true, // Permite valores nulos
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Relación entre Cliente e InformacionDePago
Cliente.hasMany(InformacionDePago, { foreignKey: "ID_CLIENTE", as: "informacionesDePago" });
InformacionDePago.belongsTo(Cliente, { foreignKey: "ID_CLIENTE", as: "cliente" });

module.exports = { InformacionDePago };
