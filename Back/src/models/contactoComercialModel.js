const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { cliente } = require("./clientemodel");

const contactocomercial = db.define(
  "contacto_comercial",
  {
    id_contacto_comercial: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true, 
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      references: {
        model: cliente, 
        key: "id_cliente",
      },
      allowNull: false, 
    },
    contacto_comercial: { 
      type: DataTypes.STRING,
      allowNull: true, 
    },
    correo_electronico_comercial: { 
      type: DataTypes.STRING,
      allowNull: true, 
    },
    telefono_fijo: { 
      type: DataTypes.STRING,
      allowNull: true, 
    },
    telefono_celular: { 
      type: DataTypes.STRING,
      allowNull: true, 
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

cliente.hasOne(contactocomercial, { foreignKey: "id_cliente", as: "contacto_comercial" }); 
contactocomercial.belongsTo(cliente, { foreignKey: "id_cliente", as: "cliente" }); 

module.exports = { contactocomercial };
