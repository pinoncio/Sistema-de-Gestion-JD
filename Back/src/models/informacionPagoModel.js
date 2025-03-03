const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { cliente } = require("./clientemodel");

const informaciondepago = db.define(
  "informacion_de_pago",
  {
    id_informacion: {
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
    nombre_responsable: { 
      type: DataTypes.STRING,
      allowNull: true, // Corregido: 'allowNull' en lugar de 'allownull'
    },
    correo_electronico: { 
      type: DataTypes.STRING,
      allowNull: true, // Corregido: 'allowNull' en lugar de 'allownull'
    },
    telefono_responsable: { 
      type: DataTypes.STRING,
      allowNull: true, // Corregido: 'allowNull' en lugar de 'allownull'
    },
  },
  {
    freezeTableName: true, // Corregido: 'freezeTableName' en minúsculas
    timestamps: false,
  }
);

// Relación entre cliente e informaciondepago
cliente.hasOne(informaciondepago, { foreignKey: "id_cliente", as: 'informacionesdepago' });
informaciondepago.belongsTo(cliente, { foreignKey: "id_cliente", as: 'cliente' });


module.exports = { informaciondepago };
