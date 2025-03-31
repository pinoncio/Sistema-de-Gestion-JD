const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { cliente } = require("./clientemodel");
const { maquina } = require("./maquinamodel"); // Importamos el modelo de maquina

const ot = db.define(
  "ot",
  {
    id_ot: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: cliente,
        key: "id_cliente",
      },
    },
    tipo_documento: { type: DataTypes.STRING(50) },
    fecha_solicitud: { type: DataTypes.DATEONLY },
    fecha_entrega: { type: DataTypes.DATEONLY },
    tipo_ot: { type: DataTypes.STRING(50) },
    equipo: { type: DataTypes.STRING(100) },
    numero_serie: { type: DataTypes.STRING(100) },
    horas_trabajo: { type: DataTypes.INTEGER },
    prioridad: { type: DataTypes.STRING(50) },
    observacion_inicial: { type: DataTypes.STRING(50) },
    observacion_final: { type: DataTypes.TEXT },
    descripcion: { type: DataTypes.TEXT },
    sub_total: { type: DataTypes.FLOAT },
    comentario: { type: DataTypes.TEXT },
    descuento_global: { type: DataTypes.FLOAT },
    monto_neto: { type: DataTypes.FLOAT },
    monto_exento: { type: DataTypes.FLOAT },
    iva: { type: DataTypes.FLOAT },
    total: { type: DataTypes.FLOAT },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Definir relaciones
ot.belongsTo(cliente, { foreignKey: "id_cliente" });
cliente.hasMany(ot, { foreignKey: "id_cliente" });


module.exports = { ot };
