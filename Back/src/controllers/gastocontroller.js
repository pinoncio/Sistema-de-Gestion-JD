const { Op } = require("sequelize");
const { ot } = require("../models/otmodel");
const { gasto } = require("../models/gastomodel");
const { otgasto } = require("../models/otgastomodel");
const { cliente } = require("../models/clientemodel");
const { producto } = require("../models/productomodel");

const getGastos = async (req, res) => {
  try {
    const gastos = await gasto.findAll({
      include: [
        {
          model: ot,
          through: {
            model: otgasto,
            attributes: [],
          },
          include: {
            model: cliente,
            attributes: ["nombre_razon_social"],
          },
        },
        {
          model: cliente,
          attributes: ["nombre_razon_social"],
        },
      ],
    });
    res.json(gastos);
  } catch (error) {
    res.status(500).json({
      msg: "Error al obtener la lista de gastos.",
      error,
    });
  }
};

const getGasto = async (req, res) => {
  const id = parseInt(req.params.id_gasto, 10);

  if (isNaN(id)) {
    return res.status(400).json({ msg: "ID de gasto inválido." });
  }

  try {
    const gastoEncontrado = await gasto.findOne({
      where: { id_gasto: id },
      include: [
        {
          model: ot,
          through: {
            model: otgasto,
            attributes: [],
          },
          include: {
            model: cliente,
            attributes: ["nombre_razon_social"],
          },
        },
        {
          model: cliente,
          attributes: ["nombre_razon_social"],
        },
      ],
    });

    if (!gastoEncontrado) {
      return res.status(404).json({
        msg: `El gasto con id ${id} no existe.`,
      });
    }

    res.json(gastoEncontrado);
  } catch (error) {
    console.error("Error en getGasto:", error);
    res.status(500).json({
      msg: `Ha ocurrido un error al encontrar el gasto con id: ${id}`,
      error: error.message || error,
    });
  }
};

const newGasto = async (req, res) => {
  const {
    id_ot,
    sin_ot,
    item_gasto,
    detalle,
    descripcion,
    fecha_compra,
    metodo_pago,
    pago_neto,
    iva,
    total_pagado,
    nro_factura,
    proveedor,
    id_cliente,
    observacion,
  } = req.body;

  try {
    // Validación de que el par (item_gasto, proveedor) sea único
    const existingGasto = await gasto.findOne({
      where: { item_gasto, proveedor },
    });

    if (existingGasto) {
      console.log(
        "Este gasto ya está registrado con este proveedor, pero se permitirá la repetición."
      );
    }

    // Asegurarse de que no se pasen ambos campos (id_ot y sin_ot)
    if (id_ot && sin_ot && sin_ot.trim() !== "") {
      return res.status(400).json({
        msg: "Solo se puede proporcionar id_ot o sin_ot, no ambos.",
      });
    }

    // Si sin_ot es undefined o está vacío, lo convertimos a "No"
    const sinOtValue = sin_ot && sin_ot.trim() !== "" ? sin_ot.trim() : "No";

    // Creación del nuevo gasto
    const nuevoGasto = await gasto.create({
      item_gasto,
      detalle,
      descripcion,
      fecha_compra,
      metodo_pago,
      pago_neto,
      iva,
      total_pagado,
      nro_factura,
      proveedor,
      sin_ot: sinOtValue,
      id_cliente,
      observacion,
    });

    // Si se proporciona id_ot, asociamos la OT con el gasto
    if (id_ot) {
      const otExistente = await ot.findByPk(id_ot);
      if (!otExistente) {
        return res.status(400).json({ msg: "La OT especificada no existe." });
      }

      await otgasto.create({
        id_ot: id_ot,
        id_gasto: nuevoGasto.id_gasto,
      });

      // Crear un nuevo producto para la OT
      const productoData = {
        id_ot,
        nombre_producto: item_gasto,
        cantidad_producto: 1,
        precio_unitario: total_pagado,
        descuento_producto: 0,
        recargo_producto: total_pagado * 0.5,
        af_ex: "Afecto",
        precio_total: total_pagado + total_pagado * 0.5,
      };

      await producto.create(productoData);
    }

    return res.status(201).json({
      msg: "Gasto creado correctamente.",
      gasto: nuevoGasto,
    });
  } catch (error) {
    console.error("Error al crear el gasto:", error);
    return res.status(400).json({
      msg: "Ocurrió un error al crear el gasto.",
      error,
    });
  }
};

const updateGasto = async (req, res) => {
  const { id_gasto } = req.params;
  const {
    id_ot,
    sin_ot,
    item_gasto,
    detalle,
    descripcion,
    fecha_compra,
    metodo_pago,
    pago_neto,
    iva,
    total_pagado,
    nro_factura,
    proveedor,
    id_cliente,
    observacion,
  } = req.body;

  try {
    const existingGasto = await gasto.findOne({
      where: { id_gasto },
    });

    if (!existingGasto) {
      return res.status(404).json({
        msg: "No existe un gasto con id: " + id_gasto,
      });
    }

    if (id_ot && sin_ot && sin_ot.trim() !== "") {
      return res.status(400).json({
        msg: "Solo se puede proporcionar id_ot o sin_ot, no ambos.",
      });
    }

    // Asegurar que sin_ot se almacene correctamente como string o null si está vacío
    const sinOtValue = sin_ot && sin_ot.trim() !== "" ? sin_ot.trim() : null;

    // Actualizar el gasto
    await gasto.update(
      {
        item_gasto,
        detalle,
        descripcion,
        fecha_compra,
        metodo_pago,
        pago_neto,
        iva,
        total_pagado,
        nro_factura,
        proveedor,
        sin_ot: sinOtValue,
        id_cliente,
        observacion,
      },
      { where: { id_gasto } }
    );

    if (id_ot) {
      const otExistente = await ot.findByPk(id_ot);
      if (!otExistente) {
        return res.status(400).json({ msg: "La OT especificada no existe." });
      }

      // Verificar si ya existe la relación entre OT y gasto
      const relacionExistente = await otgasto.findOne({
        where: { id_ot, id_gasto },
      });

      if (!relacionExistente) {
        await otgasto.create({
          id_ot,
          id_gasto,
        });
      }

      // Buscar el producto con el nombre original del gasto
      const productoExistente = await producto.findOne({
        where: {
          id_ot,
          nombre_producto: existingGasto.item_gasto, // usamos el nombre anterior para encontrarlo
        },
      });

      const productoData = {
        nombre_producto: item_gasto,
        cantidad_producto: 1,
        precio_unitario: total_pagado,
        descuento_producto: 0,
        recargo_producto: total_pagado * 0.5,
        af_ex: "Afecto",
        precio_total: total_pagado + total_pagado * 0.5,
      };

      if (productoExistente) {
        await productoExistente.update(productoData);
      } else {
        productoData.id_ot = id_ot;
        await producto.create(productoData);
      }
    }

    return res.json({
      msg: "Gasto actualizado correctamente.",
    });
  } catch (error) {
    console.error("Error al actualizar el gasto:", error);
    return res.status(400).json({
      msg: "Ha ocurrido un error al actualizar el gasto.",
      error: error.message || error,
    });
  }
};

const deleteGasto = async (req, res) => {
  const { id_gasto } = req.params;

  try {
    const result = await gasto.destroy({ where: { id_gasto } });

    if (result === 1) {
      console.log(`Gasto con id ${id_gasto} eliminado correctamente.`);
      return res.json({ msg: "Gasto eliminado correctamente." });
    } else {
      console.log(
        `No se encontró ningún gasto con id ${id_gasto} para eliminar.`
      );
      return res
        .status(404)
        .json({ msg: "No se encontró ningún gasto para eliminar." });
    }
  } catch (error) {
    console.error(`Error al eliminar el gasto con id ${id_gasto}:`, error);
    return res.status(500).json({
      msg: "Ha ocurrido un error al eliminar el gasto.",
      error: error.message,
    });
  }
};

const getGastosMensuales = async (req, res) => {
  const { anio, mes, clienteId } = req.query;

  if (!anio) {
    return res.status(400).json({
      msg: "Debe proporcionar 'anio' en los parámetros de consulta.",
    });
  }

  try {
    let whereCondition = {
      fecha_compra: {
        [Op.gte]: new Date(anio, 0, 1),
        [Op.lte]: new Date(anio, 11, 31, 23, 59, 59),
      },
    };

    if (mes && mes !== "todos") {
      const fechaInicio = new Date(anio, mes - 1, 1);
      const fechaFin = new Date(anio, mes, 0, 23, 59, 59);
      whereCondition.fecha_compra = {
        [Op.between]: [fechaInicio, fechaFin],
      };
    }

    // Filtrar directamente por 'id_cliente' si se proporciona
    if (clienteId) {
      whereCondition.id_cliente = clienteId;
    }

    const gastos = await gasto.findAll({
      where: whereCondition,
      include: [
        {
          model: ot,
          through: {
            model: otgasto,
            attributes: [],
          },
          include: {
            model: cliente,
            attributes: ["nombre_razon_social"],
          },
        },
        {
          model: cliente,
          attributes: ["nombre_razon_social"],
        },
      ],
    });

    res.json(gastos);
  } catch (error) {
    console.error("Error al obtener los gastos mensuales:", error);
    res.status(500).json({
      msg: "Error al obtener los gastos mensuales.",
      error: error.message,
    });
  }
};


module.exports = {
  newGasto,
  updateGasto,
  getGasto,
  getGastos,
  deleteGasto,
  getGastosMensuales,
};
