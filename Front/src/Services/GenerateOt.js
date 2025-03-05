import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logoImage from "./../assets/images/logo.jpg";
import getOtData from "./getOtData";

const drawTextInBox = (
  doc,
  x,
  y,
  width,
  height,
  title,
  content,
  alignment = "left",
  lineWidth = 0.5,
  titleFontSize = 14,
  contentFontSize = 10
) => {
  doc.setLineWidth(lineWidth);
  doc.setDrawColor(0, 0, 0);
  doc.setFillColor(255, 255, 255);
  doc.rect(x, y, width, height, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(titleFontSize);
  const titleWidth = doc.getTextWidth(title);
  let titleX = x + 5;
  if (alignment === "center") {
    titleX = x + (width - titleWidth) / 2;
  } else if (alignment === "right") {
    titleX = x + width - titleWidth - 5;
  }
  doc.text(title, titleX, y + 7);
  doc.setFontSize(contentFontSize);
  const contentWidth = doc.getTextWidth(content);
  let contentX = x + 5;
  if (alignment === "center") {
    contentX = x + (width - contentWidth) / 2;
  } else if (alignment === "right") {
    contentX = x + width - contentWidth - 5;
  }
  doc.text(content, contentX, y + 14);
};

export const generatePdf = async (id_ot) => {
  try {
    const otData = await getOtData(id_ot);
    if (!otData) {
      console.log("No hay datos para generar el PDF");
      return;
    }

    const doc = new jsPDF();
    const logo = logoImage;
    doc.addImage(logo, "JPG", 10, 5, 38, 38);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("SEPULVEDA DE LA FUENTE SPA", 55, 13);
    doc.setFont("helvetica", "normal");
    doc.text("R.U.T: 77.102.337-1", 55, 17);
    doc.text("MANTENIMIENTO Y REPARACIÓN DE VEHÍCULOS", 55, 21);
    doc.text("AUTOMOTRICE, MAQ AGRICOLA", 55, 25);
    doc.text("Dirección: 34 ORIENTE 2964, VALLES DEL COUNTRY, Talca", 55, 29);
    doc.text("Email: jsepulveda@jdservice.cl", 55, 33);
    doc.text("Teléfono(s): +56 944206238", 55, 37);
    drawTextInBox(
      doc,
      140,
      10,
      60,
      20,
      "ORDEN DE TRABAJO",
      `Nº ${otData.id_ot}`,
      "center",
      0.7,
      10,
      10
    );
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(
      `Fecha emisión: ${new Date(otData.fecha_solicitud).toLocaleDateString()}`,
      160,
      47
    );
    const contentCol1 = [
      { text: `Señor(es):`, yOffset: 10 },
      { text: `Dirección:`, yOffset: 16 },
      { text: `Giro:`, yOffset: 22 },
      { text: `Tipo OT:`, yOffset: 28 },
      { text: `Prioridad:`, yOffset: 34 },
      { text: `Vendedor:`, yOffset: 40 },
    ];
    const contentCol2 = [
      { text: `${otData.cliente.nombre_razon_social}`, yOffset: 10 },
      { text: `${otData.cliente.direccion}`, yOffset: 16 },
      { text: `${otData.cliente.giro}`, yOffset: 22 },
      { text: `${otData.tipo_ot}`, yOffset: 28 },
      { text: `${otData.prioridad}`, yOffset: 34 },
      { text: `${otData.vendedor}`, yOffset: 40 },
    ];
    const contentCol3 = [
      { text: `RUT:`, yOffset: 10 },
      { text: `Comuna:`, yOffset: 16 },
      { text: `Ciudad:`, yOffset: 22 },
      { text: `Entrega:`, yOffset: 28 },
      { text: `Forma pago:`, yOffset: 34 },
    ];
    const contentCol4 = [
      { text: `${otData.cliente.rut}`, yOffset: 10 },
      { text: `${otData.cliente.comuna}`, yOffset: 16 },
      { text: `${otData.cliente.ciudad}`, yOffset: 22 },
      {
        text: `${new Date(otData.fecha_entrega).toLocaleDateString()}`,
        yOffset: 28,
      },
      {
        text: `${otData.cliente.clientemetodospago[0]?.metodopago?.nombre_metodo}`,
        yOffset: 34,
      },
    ];
    const x = 10;
    const y = 50;
    const columnWidth = 48;
    const height = 60;
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(255, 255, 255);
    doc.rect(x, y, columnWidth * 4, height, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    contentCol1.forEach((item) => {
      doc.text(item.text, x + 5, y + item.yOffset);
    });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const xCol2 = x + columnWidth - 23;
    contentCol2.forEach((item) => {
      doc.text(item.text, xCol2, y + item.yOffset);
    });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    const xCol3 = x + columnWidth * 2 + 35;
    contentCol3.forEach((item) => {
      doc.text(item.text, xCol3, y + item.yOffset);
    });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const xCol4 = x + columnWidth * 3 + 10;
    contentCol4.forEach((item) => {
      doc.text(item.text, xCol4, y + item.yOffset);
    });
    const yObservaciones = y + height;
    const obsWidth = (columnWidth * 4) / 2;
    const obsHeight = 20;
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(255, 255, 255);
    doc.rect(x, yObservaciones, obsWidth * 2, 20, "FD");
    const xDiv = x + obsWidth;
    doc.line(xDiv, yObservaciones, xDiv, yObservaciones + obsHeight);
    doc.setFont("helvetica", "bold");
    doc.text("Observación Inicial:", x + 5, yObservaciones + 8);
    doc.text("Observación Final:", x + obsWidth + 5, yObservaciones + 8);
    doc.setFont("helvetica", "normal");
    const finalY = yObservaciones + obsHeight + 1;
    autoTable(doc, {
      startY: finalY + 10,
      tableWidth: "auto",
      margin: { left: x - 1, right: x - 2 },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontStyle: "bold",
        halign: "center",
      },
      styles: {
        textColor: [0, 0, 0],
        halign: "center",
        lineWidth: 0,
      },
      didParseCell: function (data) {
        if (data.section === "body") {
          data.cell.styles.fillColor =
            data.row.index % 2 === 0 ? [255, 255, 255] : [255, 255, 255];
        }
      },

      didDrawCell: function (data) {
        if (data.section === "body" || data.section === "head") {
          const { cell, row, column } = data;
          const { x, y, width, height } = cell;
          doc.setDrawColor(0, 0, 0);
          doc.setLineWidth(0.5);
          if (column.index === 0) doc.line(x, y, x, y + height);
          if (column.index === data.table.columns.length - 1)
            doc.line(x + width, y, x + width, y + height);
          if (row.index === 0) doc.line(x, y, x + width, y);
          if (row.index === data.table.body.length - 1)
            doc.line(x, y + height, x + width, y + height);
        }
      },

      head: [
        [
          "Código",
          "Descripción",
          "Cant.",
          "Precio",
          "Dscto.(%)",
          "Recargo",
          "Af/Ex",
          "Valor",
        ],
      ],
      body: [
        ...otData.ot_insumo.map((item) => [
          item.id_insumo,
          item.insumo.nombre_insumo,
          item.cantidad_insumo,
          item.precio_unitario,
          item.descuento_insumo,
          item.recargo_insumo,
          item.af_ex_insumo,
          item.precio_total,
        ]),

        ...otData.productos.map((item) => [
          item.id_producto,
          item.nombre_producto,
          item.cantidad_producto,
          item.precio_unitario,
          item.descuento_producto,
          item.recargo_producto,
          item.af_ex,
          item.precio_total,
        ]),
      ],
    });

    const newFinalY = doc.lastAutoTable.finalY;
    doc.text(
      `Nº líneas: ${otData.ot_insumo.length} / Cant: ${otData.ot_insumo.reduce(
        (acc, item) => acc + item.cantidad_insumo,
        0
      )}`,
      15,
      newFinalY + 10
    );
    doc.text("Observaciones generales:", 15, newFinalY + 15);
    doc.text(otData.observaciones || "Sin observaciones", 15, newFinalY + 20);
    doc.text(`Subtotal: $ ${otData.sub_total}`, 140, newFinalY + 10);
    doc.text(`Monto neto: $ ${otData.monto_neto}`, 140, newFinalY + 15);
    doc.text(`IVA (%): $ ${otData.iva}`, 140, newFinalY + 20);
    doc.text(`Total: $ ${otData.total}`, 140, newFinalY + 25);
    doc.text("Desarrollado por relBase.cl 2024", 15, newFinalY + 35);
    doc.save(`Orden_Trabajo_${otData.id_ot}.pdf`);
  } catch (error) {
    console.error("Error al generar el PDF:", error);
  }
};
