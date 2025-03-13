const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { rol } = require("./rolemodel");

const usuario = db.define(
  "usuario",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_usuario: { type: DataTypes.STRING },
    apellido_usuario: { type: DataTypes.STRING },
    rut_usuario: { type: DataTypes.STRING, unique: true },
    email_usuario: { type: DataTypes.STRING, unique: true },
    contrasenia_usuario: { type: DataTypes.STRING },
    fecha_nacimiento_usuario: { type: DataTypes.DATE },
    rol_usuario: {
      type: DataTypes.INTEGER,
      references: {
        model: rol,
        key: "id_rol",
      },
    },
    estado_usuario: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

usuario.belongsTo(rol, { foreignKey: "rol_usuario" });
rol.hasMany(usuario, { foreignKey: "rol_usuario" });

module.exports = { usuario };
