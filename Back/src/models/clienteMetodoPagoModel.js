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
        model: cliente,
        key: "id_cliente",
      },
      allowNull: false,
    },
    id_metodo_pago: {
      type: DataTypes.INTEGER,
      references: {
        model: metodopago,
        key: "id_metodo_pago",
      },
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

cliente.hasMany(clientemetodopago, {
  foreignKey: "id_cliente",
  as: "clientemetodospago",
});
clientemetodopago.belongsTo(cliente, {
  foreignKey: "id_cliente",
  as: "cliente",
});

metodopago.hasMany(clientemetodopago, {
  foreignKey: "id_metodo_pago",
  as: "metodospago",
});
clientemetodopago.belongsTo(metodopago, {
  foreignKey: "id_metodo_pago",
  as: "metodopago",
});

module.exports = { clientemetodopago };
