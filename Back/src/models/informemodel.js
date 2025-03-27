const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { cliente } = require("./clientemodel");
const { ot } = require("./otmodel");
const { maquina } = require("./maquinamodel"); 

const it = db.define(
  "informe_trabajo",
  {
    id_it: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tecnico: { type: DataTypes.STRING(50) },
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
    id_maquina: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: maquina,
        key: "id_maquina",
      },
    },
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
    solucion: { type: DataTypes.TEXT },
    total_hh: { type: DataTypes.STRING(50) },
    total_km: { type: DataTypes.STRING(50) },
    insumo: { type: DataTypes.STRING(50) },
    observacion: { type: DataTypes.TEXT },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Definir relaciones
it.belongsTo(cliente, { foreignKey: "id_cliente" });
cliente.hasMany(it, { foreignKey: "id_cliente" });

it.belongsTo(ot, { foreignKey: "id_ot" });
ot.hasMany(it, { foreignKey: "id_ot" });

it.belongsTo(maquina, { foreignKey: "id_maquina", as: "maquinas" }); 
maquina.hasMany(it, { foreignKey: "id_maquina" }); 

module.exports = { it };
