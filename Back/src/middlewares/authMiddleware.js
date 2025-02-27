const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Cargar variables de entorno desde .env
dotenv.config();

// Middleware de autenticación con roles dinámicos
const authMiddleware = (rolesPermitidos) => {
  return (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; 

    if (!token) {
      return res.status(403).json({
        message: "Acceso denegado. No se proporcionó un token.",
      });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token no válido." });
      }

      req.user = decoded; // Guardar datos del usuario en la request

      // Verificar si el rol del usuario está permitido
      if (!rolesPermitidos.includes(req.user.rol)) {
        return res.status(403).json({ message: "Acceso denegado. Rol no autorizado." });
      }

      next();
    });
  };
};

module.exports = authMiddleware;
