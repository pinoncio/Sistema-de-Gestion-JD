const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { cliente } = require("./clientemodel");

const informaciondepago = db.define(
  "informacion_de_pago",
  {
    id_informacion: {
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
    nombre_responsable: { 
      type: DataTypes.STRING,
      allowNull: true, 
    },
    correo_electronico: { 
      type: DataTypes.STRING,
      allowNull: true, 
    },
    telefono_responsable: { 
      type: DataTypes.STRING,
      allowNull: true, 
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Relación entre cliente e informaciondepago
cliente.hasOne(informaciondepago, { foreignKey: "id_cliente", as: 'informacionesdepago' });
informaciondepago.belongsTo(cliente, { foreignKey: "id_cliente", as: 'cliente' });


module.exports = { informaciondepago };
