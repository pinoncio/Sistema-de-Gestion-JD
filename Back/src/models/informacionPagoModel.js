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
      allowNull: false,
    },
    NOMBRE_RESPONSABLE: { type: DataTypes.STRING },
    CORREO_ELECTRONICO: { type: DataTypes.STRING },
    TELEFONO_RESPONSABLE: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Relación entre Cliente y InformacionDePago
Cliente.hasMany(InformacionDePago, { foreignKey: "ID_CLIENTE", as: 'informacionesDePago' });
InformacionDePago.belongsTo(Cliente, { foreignKey: "ID_CLIENTE", as: 'cliente' });

module.exports = { InformacionDePago };
