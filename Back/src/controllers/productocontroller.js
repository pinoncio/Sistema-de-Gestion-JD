const { producto } = require("../models/productomodel");
const { ot } = require("../models/otmodel");

const getAllProductos = async (req, res) => {
  try {
    const productos = await producto.findAll({
      include: [
        {
          model: ot,
          attributes: ["id_ot", "tipo_documento", "fecha_solicitud"],
        },
      ],
    });

    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener la lista de productos.",
      error: error.message,
      stack: error.stack,
    });
  }
};

const getProductosByOt = async (req, res) => {
  const { id_ot } = req.params;
  try {
    const productos = await producto.findAll({
      where: { id_ot },
      include: [
        {
          model: ot,
          attributes: ["id_ot", "tipo_documento", "fecha_solicitud"],
        },
      ],
    });

    if (productos.length === 0) {
      return res
        .status(404)
        .json({
          msg: `No se encontraron productos para la OT con id: ${id_ot}`,
        });
    }

    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener los productos de la orden de trabajo.",
      error: error.message,
      stack: error.stack,
    });
  }
};

module.exports = { getAllProductos, getProductosByOt };
