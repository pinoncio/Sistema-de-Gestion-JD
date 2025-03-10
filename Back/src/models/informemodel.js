const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { cliente } = require("./clientemodel");
const { ot } = require("./otmodel");

const it = db.define(
  "informe_trabajo",
  {
    id_it: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Tecnico: { type: DataTypes.STRING(255) },
    id_cliente: {
      type: DataTypes.INTEGER,
      references: {
        model: cliente,
        key: "id_cliente",
      },
    },
    id_ot: {
      type: DataTypes.INTEGER,
      references: {
        model: ot,
        key: "id_ot",
      },
    },
    tecnico: { type: DataTypes.STRING(255)},
    maquina: { type: DataTypes.STRING(255) },
    modelo: { type: DataTypes.STRING(255) },
    horometro: { type: DataTypes.INTEGER },
    numero_serie: { type: DataTypes.STRING(100) },
    numero_motor: { type: DataTypes.STRING(100) },
    km_salida: { type: DataTypes.INTEGER },
    km_retorno: { type: DataTypes.INTEGER },
    queja_sintoma: { type: DataTypes.TEXT },
    diagnostico: { type: DataTypes.TEXT },
    pieza_falla: { type: DataTypes.TEXT },
    solucion: { type: DataTypes.TEXT},
    total_hh: { type: DataTypes.STRING(50)},
    total_km: { type: DataTypes.STRING(50)},
    insumo: { type: DataTypes.STRING(50)},
    observacion: { type: DataTypes.TEXT },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Definir relaciones con cliente y OT
it.belongsTo(cliente, { foreignKey: "id_cliente" });
cliente.hasMany(it, { foreignKey: "id_cliente" });

it.belongsTo(ot, { foreignKey: "id_ot" });
ot.hasMany(it, { foreignKey: "id_ot" });

module.exports = { it };
