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
              as: "informacion_de_pago",
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
              as: "informacion_de_pago",
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
      tecnico: tecnico || null,
      maquina: maquina || null, 
      modelo: modelo || null, 
      horometro: horometro || null, 
      numero_serie: numero_serie || null,
      numero_motor: numero_motor || null, 
      km_salida: km_salida || null, 
      km_retorno: km_retorno || null, 
      queja_sintoma: queja_sintoma || null, 
      diagnostico: diagnostico || null, 
      pieza_falla: pieza_falla || null, 
      solucion: solucion || null,
      total_hh: total_hh || null, 
      total_km: total_km || null, 
      insumo: insumo || null, 
      observacion: observacion || null, 
    });


    const controlTiempoData = control_tiempo.map((control) => ({
      id_it: nuevaIt.id_it,
      fecha: control.fecha || null, 
      viaje_ida: control.viaje_ida || null, 
      trabajo: control.trabajo || null, 
      viaje_vuelta: control.viaje_vuelta || null, 
      total_hh_viaje: control.total_hh_viaje || null, 
      total_hh_trabajo: control.total_hh_trabajo || null, 
    }));

    await controltiempo.bulkCreate(controlTiempoData);


    let clienteCreado = await cliente.findOne({ where: { id_cliente } });

    if (!clienteCreado) {

      clienteCreado = await cliente.create({
        nombre_razon_social: clienteData.nombre_razon_social || null, 
        rut: clienteData.rut || null,
        direccion: clienteData.direccion || null, 
      });
    }


    if (clienteData && clienteData.informacion_de_pago) {
      const { correo_electronico, telefono_responsable } =
        clienteData.informacion_de_pago;

      console.log(
        "Creando información de pago para el cliente:",
        clienteData.informacion_de_pago
      );

      await informaciondepago.create({
        id_cliente: clienteCreado.id_cliente,
        correo_electronico: correo_electronico || null, 
        telefono_responsable: telefono_responsable || null, 
      });
    } else {
      console.log("No se encontró información de pago para el cliente.");
    }

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
      tecnico: tecnico || null,
      maquina: maquina || null, 
      modelo: modelo || null,
      horometro: horometro || null, 
      numero_serie: numero_serie || null, 
      numero_motor: numero_motor || null, 
      km_salida: km_salida || null, 
      km_retorno: km_retorno || null, 
      queja_sintoma: queja_sintoma || null, 
      diagnostico: diagnostico || null, 
      pieza_falla: pieza_falla || null, 
      solucion: solucion || null,
      total_hh: total_hh || null, 
      total_km: total_km || null, 
      insumo: insumo || null, 
      observacion: observacion || null, 
    });


    if (control_tiempo && control_tiempo.length > 0) {
      await controltiempo.destroy({ where: { id_it } });

      const controlTiempoData = control_tiempo.map((control) => ({
        id_it: informeExistente.id_it,
        fecha: control.fecha || null, 
        viaje_ida: control.viaje_ida || null, 
        trabajo: control.trabajo || null, 
        viaje_vuelta: control.viaje_vuelta || null, 
        total_hh_viaje: control.total_hh_viaje || null, 
        total_hh_trabajo: control.total_hh_trabajo || null, 
      }));

      await controltiempo.bulkCreate(controlTiempoData);
    }


    let clienteExistente = await cliente.findOne({ where: { id_cliente } });

    if (!clienteExistente) {
      return res.status(404).json({
        msg: `El cliente con id: ${id_cliente} no existe`,
      });
    }


    await clienteExistente.update({
      nombre_razon_social: clienteData.nombre_razon_social || null, 
      rut: clienteData.rut || null, 
      direccion: clienteData.direccion || null, 
    });


    const informacionPagoExistente = await informaciondepago.findOne({
      where: { id_cliente },
    });

    if (informacionPagoExistente) {

      await informacionPagoExistente.update({
        correo_electronico:
          clienteData.informacion_de_pago.correo_electronico || null, 
        telefono_responsable:
          clienteData.informacion_de_pago.telefono_responsable || null,
      });
    } else {

      await informaciondepago.create({
        id_cliente: clienteExistente.id_cliente,
        correo_electronico:
          clienteData.informacion_de_pago.correo_electronico || null, 
        telefono_responsable:
          clienteData.informacion_de_pago.telefono_responsable || null, 
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
