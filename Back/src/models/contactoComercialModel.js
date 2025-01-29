const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { Cliente } = require("./clienteModel");

const ContactoComercial = db.define(
  "contacto_comercial",
  {
    ID_CONTACTO_COMERCIAL: {
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
    CONTACTO_COMERCIAL: { type: DataTypes.STRING },
    CORREO_ELECTRONICO_COMERCIAL: { type: DataTypes.STRING },
    TELEFONO_FIJO: { type: DataTypes.STRING },
    TELEFONO_CELULAR: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Relación entre Cliente y ContactoComercial
Cliente.hasMany(ContactoComercial, { foreignKey: "ID_CLIENTE", as: 'contactosComerciales' });
ContactoComercial.belongsTo(Cliente, { foreignKey: "ID_CLIENTE", as: 'cliente' });

module.exports = { ContactoComercial };
