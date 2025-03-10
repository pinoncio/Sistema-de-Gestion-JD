const { it } = require("../models/informemodel");
const { cliente } = require("../models/clientemodel");
const { ot } = require("../models/otmodel");
const { controltiempo } = require("../models/controltiempomodel");
const { informaciondepago } = require("../models/informacionpagomodel");

const getInformeTrabajos = async (req, res) => {
  try {
    const informes = await it.findAll({
      include: [
        {
          model: cliente,
          attributes: ["nombre_razon_social", "rut", "direccion"],
          include: [
            {
              model: informaciondepago,
              as: "informacionesdepago",
              attributes: ["correo_electronico", "telefono_responsable"],
            },
          ],
        },
        { model: ot, attributes: ["id_ot"] },
        {
          model: controltiempo,
          as: "control_tiempo",
          attributes: [
            "id_control_tiempo",
            "dia",
            "fecha",
            "viaje_ida",
            "trabajo",
            "viaje_vuelta",
            "total_hh_viaje",
            "total_hh_trabajo",
          ],
        },
      ],
    });

    res.json(informes);
  } catch (error) {
    console.error("Error al obtener los informes de trabajo:", error);
    res.status(500).json({
      msg: "Error al obtener los informes de trabajo.",
      error: error.message || error,
    });
  }
};

const getInformeTrabajo = async (req, res) => {
  const { id_it } = req.params;
  try {
    const informe = await it.findOne({
      where: { id_it },
      include: [
        {
          model: cliente,
          attributes: ["nombre_razon_social", "rut", "direccion"],
          include: [
            {
              model: informaciondepago,
              as: "informacionesdepago",
              attributes: ["correo_electronico", "telefono_responsable"],
            },
          ],
        },
        { model: ot, attributes: ["id_ot"] },
        {
          model: controltiempo,
          as: "control_tiempo",
          attributes: [
            "id_control_tiempo",
            "dia",
            "fecha",
            "viaje_ida",
            "trabajo",
            "viaje_vuelta",
            "total_hh_viaje",
            "total_hh_trabajo",
          ],
        },
      ],
    });

    if (!informe) {
      return res.status(404).json({
        msg: `El informe de trabajo con id: ${id_it} no existe`,
      });
    }

    res.json(informe);
  } catch (error) {
    console.error(
      `Error al obtener el informe de trabajo con id ${id_it}:`,
      error
    );
    res.status(500).json({
      msg: `Error al obtener el informe de trabajo con id ${id_it}`,
      error: error.message || error,
    });
  }
};

const newInformeTrabajo = async (req, res) => {
  const {
    id_cliente,
    id_ot,
    tecnico,
    maquina,
    modelo,
    horometro,
    numero_serie,
    numero_motor,
    km_salida,
    km_retorno,
    queja_sintoma,
    diagnostico,
    pieza_falla,
    solucion,
    total_hh,
    total_km,
    insumo,
    observacion,
    control_tiempo,
    cliente: clienteData,
  } = req.body;

  try {
    if (
      !id_cliente ||
      !id_ot ||
      !control_tiempo ||
      control_tiempo.length === 0
    ) {
      return res.status(400).json({ msg: "Faltan campos obligatorios" });
    }

    const nuevaIt = await it.create({
      id_cliente,
      id_ot,
      tecnico,
      maquina,
      modelo,
      horometro,
      numero_serie,
      numero_motor,
      km_salida,
      km_retorno,
      queja_sintoma,
      diagnostico,
      pieza_falla,
      solucion,
      total_hh,
      total_km,
      insumo,
      observacion,
    });

    const controlTiempoData = control_tiempo.map((control) => ({
      id_it: nuevaIt.id_it,
      dia: control.dia,
      fecha: control.fecha,
      viaje_ida: control.viaje_ida,
      trabajo: control.trabajo,
      viaje_vuelta: control.viaje_vuelta,
      total_hh_viaje: control.total_hh_viaje,
      total_hh_trabajo: control.total_hh_trabajo,
    }));

    await controltiempo.bulkCreate(controlTiempoData);

    // Buscar si el cliente ya existe en la base de datos
    let clienteCreado = await cliente.findOne({ where: { id_cliente } });

    // Si el cliente no existe, crearlo
    if (!clienteCreado) {
      clienteCreado = await cliente.create({
        nombre_razon_social: clienteData.nombre_razon_social,
        rut: clienteData.rut,
        direccion: clienteData.direccion,
      });
    }

    // Crear la información de pago si el cliente ya está registrado
    await informaciondepago.create({
      id_cliente: clienteCreado.id_cliente,
      correo_electronico: clienteData.informacion_de_pago.correo_electronico,
      telefono_responsable:
        clienteData.informacion_de_pago.telefono_responsable,
    });

    res.status(201).json({
      msg: "Informe de trabajo creado correctamente",
      id_it: nuevaIt.id_it,
    });
  } catch (error) {
    console.error("Error al crear el informe de trabajo:", error.message);
    res.status(500).json({
      msg: "Error al crear el informe de trabajo",
      error: error.message,
    });
  }
};

const updateInformeTrabajo = async (req, res) => {
  const { id_it } = req.params;
  const {
    id_cliente,
    id_ot,
    tecnico,
    maquina,
    modelo,
    horometro,
    numero_serie,
    numero_motor,
    km_salida,
    km_retorno,
    queja_sintoma,
    diagnostico,
    pieza_falla,
    solucion,
    total_hh,
    total_km,
    insumo,
    observacion,
    control_tiempo,
    cliente: clienteData,
  } = req.body;

  try {
    const informeExistente = await it.findOne({ where: { id_it } });

    if (!informeExistente) {
      return res.status(404).json({
        msg: `El informe de trabajo con id: ${id_it} no existe`,
      });
    }

    await informeExistente.update({
      id_cliente,
      id_ot,
      tecnico,
      maquina,
      modelo,
      horometro,
      numero_serie,
      numero_motor,
      km_salida,
      km_retorno,
      queja_sintoma,
      diagnostico,
      pieza_falla,
      solucion,
      total_hh,
      total_km,
      insumo,
      observacion,
    });

    if (control_tiempo && control_tiempo.length > 0) {
      await controltiempo.destroy({ where: { id_it } });

      const controlTiempoData = control_tiempo.map((control) => ({
        id_it: informeExistente.id_it,
        dia: control.dia,
        fecha: control.fecha,
        viaje_ida: control.viaje_ida,
        trabajo: control.trabajo,
        viaje_vuelta: control.viaje_vuelta,
        total_hh_viaje: control.total_hh_viaje,
        total_hh_trabajo: control.total_hh_trabajo,
      }));

      await controltiempo.bulkCreate(controlTiempoData);
    }

    // Buscar si el cliente ya existe en la base de datos
    let clienteExistente = await cliente.findOne({ where: { id_cliente } });

    if (!clienteExistente) {
      // Si el cliente no existe, devolver un error
      return res.status(404).json({
        msg: `El cliente con id: ${id_cliente} no existe`,
      });
    }

    // Actualizar la información del cliente si existe
    await clienteExistente.update({
      nombre_razon_social: clienteData.nombre_razon_social,
      rut: clienteData.rut,
      direccion: clienteData.direccion,
    });

    // Verificar si la información de pago ya existe para el cliente
    const informacionPagoExistente = await informaciondepago.findOne({
      where: { id_cliente },
    });

    if (informacionPagoExistente) {
      // Si existe, actualizamos
      await informacionPagoExistente.update({
        correo_electronico: clienteData.informacion_de_pago.correo_electronico,
        telefono_responsable:
          clienteData.informacion_de_pago.telefono_responsable,
      });
    } else {
      // Si no existe, lo creamos
      await informaciondepago.create({
        id_cliente: clienteExistente.id_cliente,
        correo_electronico: clienteData.informacion_de_pago.correo_electronico,
        telefono_responsable:
          clienteData.informacion_de_pago.telefono_responsable,
      });
    }

    res.status(200).json({
      msg: "Informe de trabajo actualizado correctamente",
      id_it: informeExistente.id_it,
    });
  } catch (error) {
    console.error("Error al actualizar el informe de trabajo:", error.message);
    res.status(500).json({
      msg: "Error al actualizar el informe de trabajo",
      error: error.message,
    });
  }
};

const deleteInformeTrabajo = async (req, res) => {
  const { id_it } = req.params;

  try {
    const informeExistente = await it.findOne({ where: { id_it } });

    if (!informeExistente) {
      return res.status(404).json({
        msg: `El informe de trabajo con id: ${id_it} no existe`,
      });
    }

    await controltiempo.destroy({ where: { id_it } });

    await informeExistente.destroy();

    res.status(200).json({
      msg: "Informe de trabajo eliminado correctamente",
      id_it: id_it,
    });
  } catch (error) {
    console.error("Error al eliminar el informe de trabajo:", error.message);
    res.status(500).json({
      msg: "Error al eliminar el informe de trabajo",
      error: error.message,
    });
  }
};

module.exports = {
  getInformeTrabajos,
  getInformeTrabajo,
  newInformeTrabajo,
  updateInformeTrabajo,
  deleteInformeTrabajo,
};
