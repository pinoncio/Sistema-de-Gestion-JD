const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { cliente } = require("./clientemodel"); // Asegúrate de que el modelo de cliente esté importado correctamente

const gasto = db.define(
  "gasto", 
  {
    id_gasto: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    item_gasto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detalle: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fecha_compra: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    metodo_pago: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pago_neto: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    iva: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total_pagado: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    nro_factura: {
      type: DataTypes.INTEGER,
    },
    proveedor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sin_ot: { 
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "No", 
    },
    id_cliente: { // Cambié 'cliente' a 'id_cliente' para la relación de cliente
      type: DataTypes.INTEGER,
      allowNull: true, // Puede ser NULL si no se especifica un cliente
      references: {
        model: cliente, // Se asocia a la tabla cliente
        key: 'id_cliente' // La clave primaria de la tabla cliente
      }
    },
    observacion: {
      type: DataTypes.TEXT,
      allowNull: true, 
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Relación 1 a 1 entre gasto y cliente (un gasto puede estar asociado a un solo cliente)
gasto.belongsTo(cliente, { foreignKey: "id_cliente" });
cliente.hasOne(gasto, { foreignKey: "id_cliente" });

module.exports = { gasto }; 
