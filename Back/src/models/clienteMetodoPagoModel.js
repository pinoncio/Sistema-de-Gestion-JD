const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { cliente } = require("./clientemodel");
const { metodopago } = require("./metodopagomodel");

const clientemetodopago = db.define(
  "cliente_metodo_pago",
  {
    id_cliente: {
      type: DataTypes.INTEGER,
      references: {
        model: cliente, // hace referencia al modelo cliente
        key: "id_cliente",
      },
      allowNull: false, // Corregido: 'allowNull' debe estar en mayúsculas
    },
    id_metodo_pago: {
      type: DataTypes.INTEGER,
      references: {
        model: metodopago, // hace referencia al modelo metodopago
        key: "id_metodo_pago",
      },
      allowNull: false, // Corregido: 'allowNull' debe estar en mayúsculas
    },
    referencia: { 
      type: DataTypes.STRING, // Corregido: 'DataTypes.STRING' en lugar de 'datatypes.string'
    },
  },
  {
    freezeTableName: true, // Corregido: 'freezeTableName' debe estar en minúsculas
    timestamps: false,
  }
);

// Relación entre cliente y clientemetodopago
cliente.hasMany(clientemetodopago, { foreignKey: "id_cliente", as: 'clientemetodospago' }); // Corregido: 'foreignKey' con mayúscula
clientemetodopago.belongsTo(cliente, { foreignKey: "id_cliente", as: 'cliente' }); // Corregido: 'foreignKey' con mayúscula

// Relación entre metodopago y clientemetodopago
metodopago.hasMany(clientemetodopago, { foreignKey: "id_metodo_pago", as: 'metodospago' }); // Corregido: 'foreignKey' con mayúscula
clientemetodopago.belongsTo(metodopago, { foreignKey: "id_metodo_pago", as: 'metodopago' }); // Corregido: 'foreignKey' con mayúscula

module.exports = { clientemetodopago };
