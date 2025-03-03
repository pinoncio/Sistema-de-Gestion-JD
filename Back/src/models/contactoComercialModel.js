const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { cliente } = require("./clientemodel");

const contactocomercial = db.define(
  "contacto_comercial",
  {
    id_contacto_comercial: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Corregido: 'primaryKey' en lugar de 'primarykey'
      autoIncrement: true, // Corregido: 'autoIncrement' en lugar de 'autoincrement'
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      references: {
        model: cliente, // hace referencia al modelo cliente
        key: "id_cliente",
      },
      allowNull: false, // Corregido: 'allowNull' en lugar de 'allownull'
    },
    contacto_comercial: { 
      type: DataTypes.STRING,
      allowNull: true, // Corregido: 'allowNull' en lugar de 'allownull'
    },
    correo_electronico_comercial: { 
      type: DataTypes.STRING,
      allowNull: true, // Corregido: 'allowNull' en lugar de 'allownull'
    },
    telefono_fijo: { 
      type: DataTypes.STRING,
      allowNull: true, // Corregido: 'allowNull' en lugar de 'allownull'
    },
    telefono_celular: { 
      type: DataTypes.STRING,
      allowNull: true, // Corregido: 'allowNull' en lugar de 'allownull'
    },
  },
  {
    freezeTableName: true, // Corregido: 'freezeTableName' en minúsculas
    timestamps: false,
  }
);

// Relación entre cliente y contactocomercial
cliente.hasOne(contactocomercial, { foreignKey: "id_cliente", as: "contacto_comercial" }); // Corregido: 'foreignKey' en lugar de 'foreignkey'
contactocomercial.belongsTo(cliente, { foreignKey: "id_cliente", as: "cliente" }); // Corregido: 'foreignKey' en lugar de 'foreignkey'

module.exports = { contactocomercial };
