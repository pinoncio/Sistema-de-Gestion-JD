const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { Rol } = require("./roleModel"); 

const Usuario = db.define(
  "usuario",
  {
    ID_USUARIO: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    NOMBRE_USUARIO: { type: DataTypes.STRING },
    APELLIDO_USUARIO: { type: DataTypes.STRING },
    RUT_USUARIO: { type: DataTypes.STRING, unique: true },
    EMAIL_USUARIO: { type: DataTypes.STRING, unique: true },
    CONTRASENIA_USUARIO: { type: DataTypes.STRING },
    FECHA_NACIMIENTO_USUARIO: { type: DataTypes.DATE },
    ROL_USUARIO: {
      type: DataTypes.INTEGER,
      references: {
        model: Rol,
        key: "ID_ROL", 
      },
    },
    ESTADO_USUARIO: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Definimos la relación de clave foránea
Usuario.belongsTo(Rol, { foreignKey: "ROL_USUARIO" });
Rol.hasMany(Usuario, { foreignKey: "ROL_USUARIO" });

module.exports = { Usuario };
