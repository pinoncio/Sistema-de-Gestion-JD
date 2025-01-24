const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Cargar variables de entorno desde .env
dotenv.config();

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
  // Obtenemos el token del encabezado 'Authorization'
  const token = req.headers["authorization"]?.split(" ")[1]; // Asumimos formato "Bearer <token>"

  if (!token) {
    return res
      .status(403)
      .json({ message: "Acceso denegado. No se proporcionó un token." });
  }

  // Verificamos el token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    // Cambié JWT_SECRET por SECRET_KEY
    if (err) {
      return res.status(403).json({ message: "Token no válido." });
    }

    // Si el token es válido, lo decodificamos y lo asignamos al request
    req.user = decoded; // Esto puede ser utilizado en las rutas para acceder al usuario

    // Verificar si el rol es 1 (por ejemplo, administrador)
    if (req.user.rol !== 1) {
      return res
        .status(403)
        .json({ message: "Acceso denegado. Rol no autorizado." });
    }

    // Continuamos al siguiente middleware o ruta
    next();
  });
};

module.exports = authMiddleware;
