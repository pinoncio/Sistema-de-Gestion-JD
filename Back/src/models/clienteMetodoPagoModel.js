const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { Cliente } = require("./clienteModel");
const { MetodoPago } = require("./metodoPagoModel");

const ClienteMetodoPago = db.define(
  "cliente_metodo_pago",
  {
    ID_CLIENTE: {
      type: DataTypes.INTEGER,
      references: {
        model: Cliente, // Hace referencia al modelo Cliente
        key: "ID_CLIENTE",
      },
      allowNull: false,
    },
    ID_METODO_PAGO: {
      type: DataTypes.INTEGER,
      references: {
        model: MetodoPago, // Hace referencia al modelo MetodoPago
        key: "ID_METODO_PAGO",
      },
      allowNull: false,
    },
    REFERENCIA: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Relación entre Cliente y ClienteMetodoPago
Cliente.hasMany(ClienteMetodoPago, { foreignKey: "ID_CLIENTE", as: 'clienteMetodosPago' }); // Usamos un alias
ClienteMetodoPago.belongsTo(Cliente, { foreignKey: "ID_CLIENTE", as: 'cliente' }); // Usamos el mismo alias

// Relación entre MetodoPago y ClienteMetodoPago
MetodoPago.hasMany(ClienteMetodoPago, { foreignKey: "ID_METODO_PAGO", as: 'metodosPago' });
ClienteMetodoPago.belongsTo(MetodoPago, { foreignKey: "ID_METODO_PAGO", as: 'metodoPago' });

module.exports = { ClienteMetodoPago };
