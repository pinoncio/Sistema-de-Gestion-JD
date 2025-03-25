import jsPDF from "jspdf";
import logoImage from "./../assets/images/logo.jpg";
import { getIt } from "../Services/itService";

export const generatePDF = async (id_it) => {
  try {
    const informeData = await getIt(id_it);
    if (!informeData) {
      console.log("No hay datos para generar el PDF");
      return;
    }

    const doc = new jsPDF();
    const logo = logoImage;
    doc.addImage(logo, "JPG", 10, 5, 35, 33);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("+569 4420 6238", 55, 20);
    doc.text("jsepulveda@jdservice.cl", 55, 24);
    doc.text("N° Orden", 175, 15);
    doc.text("Fecha Visita", 152, 29);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    //Fecha de visita
    //______________________________________________________________________
    // Asegúrate de obtener la fecha del primer elemento en control_tiempo
    const fecha = informeData?.control_tiempo?.[0]?.fecha || "";
    if (!fecha) {
      console.error("Fecha no encontrada en control_tiempo");
      return;
    }
    const [year, month, day] = fecha.split("-");
    const dateParts = [day, month, year];
    const labels = ["Día", "Mes", "Año"];
    let x = 170,
      y = 23,
      width = 10,
      height = 8;
    dateParts.forEach((part, index) => {
      doc.rect(x + width * index, y, width, height);
      let textX = x + width * index + width / 2;
      let textY = y + height / 2 + 2.5;
      doc.text(part, textX, textY, { align: "center" });
      let labelY = y + 3;
      doc.text(labels[index], textX, labelY, { align: "center" });
    });
    //-----------------------------------------
    // Informe de atencion

    let tableX = 10,
      tableY = 31,
      rowHeight = 8,
      colWidth = 95;
    doc.rect(tableX, tableY, colWidth * 2, rowHeight);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Informe de Atencion", tableX + colWidth, tableY + 5, {
      align: "center",
    });
    tableY += rowHeight;

    //------------------------------------------
    // Recuadro con columnas de información

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    const column1 = [
      "Tecnico:",
      "Cliente:",
      "Direccion:",
      "Maquina:",
      "Modelo:",
      "N° Serie:",
      "Km Salida:",
    ];
    const column2 = [
      "",
      "R.U.T:",
      "Fono:",
      "Correo:",
      "Horometro:",
      "N° Motor:",
      "Km Retorno:",
    ];

    const values1 = [
      String(informeData?.tecnico || ""),
      String(informeData?.cliente?.nombre_razon_social || ""),
      String(informeData?.cliente?.direccion || ""),
      String(informeData?.maquina || ""),
      String(informeData?.modelo || ""),
      String(informeData?.numero_serie || ""),
      String(informeData?.km_salida || ""),
    ];

    const values2 = [
      "",
      String(informeData?.cliente?.rut || ""),
      String(
        informeData?.cliente?.informacion_de_pago?.telefono_responsable || ""
      ),
      String(
        informeData?.cliente?.informacion_de_pago?.correo_electronico || ""
      ),
      String(informeData?.horometro || ""),
      String(informeData?.numero_motor || ""),
      String(informeData?.km_retorno || ""),
    ];

    const maxRows = Math.max(column1.length, column2.length);
    for (let i = 0; i < maxRows; i++) {
      // Mantener los cuadros existentes
      doc.rect(tableX, tableY + rowHeight * i, colWidth, rowHeight);
      doc.setFont("helvetica", "bold");
      doc.text(column1[i] || "", tableX + 2, tableY + 5 + rowHeight * i); // Etiquetas izquierda
      doc.setFont("helvetica", "normal");
      doc.text(values1[i] || "", tableX + 20, tableY + 5 + rowHeight * i); // Valores izquierda
      doc.setFont("helvetica", "bold");
      doc.rect(tableX + colWidth, tableY + rowHeight * i, colWidth, rowHeight);
      doc.text(
        column2[i] || "",
        tableX + colWidth + 2,
        tableY + 5 + rowHeight * i
      ); // Etiquetas derecha
      doc.setFont("helvetica", "normal");
      doc.text(
        values2[i] || "",
        tableX + colWidth * 2 - 70,
        tableY + 5 + rowHeight * i
      ); // Valores derecha
    }

    //--------------------------------------------------------------

    //Informe Tecnico
    doc.setFont("helvetica", "bold");
    let lastRowY = tableY + rowHeight * maxRows;
    doc.rect(tableX, lastRowY, colWidth * 2, rowHeight);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    let textX = tableX + colWidth; // Centrar horizontalmente en ambas columnas
    let textY = lastRowY + rowHeight / 2 + 1; // Ajuste fino para centrar verticalmente
    doc.text("Informe Técnico", textX, textY, { align: "center" });

    //-----------------------------------------------------------

    // Contenido Informe Tecnico

    let currentY = tableY + rowHeight * maxRows + rowHeight;
    const newRows = [
      { title: "Queja o Síntomas:", value: informeData?.queja_sintoma || "" },
      { title: "Diagnóstico:", value: informeData?.diagnostico || "" },
      {
        title: "Pieza Causante de la Falla:",
        value: informeData?.pieza_falla || "",
      },
      { title: "Solución", value: informeData?.solucion || "" },
    ];

    let totalWidth = colWidth * 2;
    let secondColumnWidth = 100;
    let firstColumnWidth = totalWidth;
    newRows.forEach(({ title, value }) => {
      doc.rect(tableX, currentY, firstColumnWidth, rowHeight);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.text(title, tableX + 2, currentY + rowHeight / 2 + 2);
      doc.setFont("helvetica", "normal");
      doc.text(value, tableX + 40 + 2, currentY + rowHeight / 2 + 2);
      currentY += rowHeight;
    });

    let emptyRowStart = currentY;
    for (let i = 0; i < 5; i++) {
      doc.rect(tableX, currentY, totalWidth, rowHeight);
      currentY += rowHeight;
    }

    const data = [
      { title: "Total HH:", value: informeData?.total_hh || "" },
      { title: "Total Km:", value: informeData?.total_km || "" },
      { title: "Insumos:", value: informeData?.insumo || "" },
    ];
    data.forEach(({ title, value }, i) => {
      let rowY = emptyRowStart + rowHeight * (2 + i);
      doc.rect(tableX, rowY, secondColumnWidth + 30, rowHeight); // Recuadro para el título
      doc.setFont("helvetica", "bold");
      doc.text(title, tableX + 130 + 2, rowY + rowHeight / 2 + 2); // Título
      doc.setFont("helvetica", "normal");
      doc.text(value, tableX + 147, rowY + rowHeight / 2 + 2); // Valor con separación
    });

    //---------------------------------------------------------------------------------------------------------------------------------

    // Control de tiempo
    doc.rect(tableX, currentY, totalWidth, rowHeight);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    let text = "Control de tiempo";
    let textWidth =
      (doc.getStringUnitWidth(text) * doc.getFontSize()) /
      doc.internal.scaleFactor;
    let textXControl = tableX + (totalWidth - textWidth) / 2;
    doc.text(text, textXControl, currentY + rowHeight / 2 + 1);
    currentY += rowHeight;

    const days = [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const columns = [
      "Día",
      "Fecha",
      "Viaje",
      "Trabajo",
      "Viaje",
      "Total HH viaje",
      "Total HH trabajo",
    ];
    const pageWidth = 210;
    const margin = 10;
    const availableWidth = pageWidth - 2 * margin;
    const numColumns = columns.length;
    const colWidthTable = availableWidth / numColumns;

    for (let col = 0; col < columns.length; col++) {
      doc.rect(
        tableX + col * colWidthTable,
        currentY,
        colWidthTable,
        rowHeight
      );
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      let textWidth =
        (doc.getStringUnitWidth(columns[col]) * doc.getFontSize()) /
        doc.internal.scaleFactor;
      let textX =
        tableX + col * colWidthTable + (colWidthTable - textWidth) / 2;

      doc.text(columns[col], textX, currentY + 5);
    }
    currentY += rowHeight;
    let dayRows = {};
    days.forEach((day, index) => {
      let rowY = currentY + index * rowHeight;
      dayRows[day] = rowY;

      doc.rect(tableX, rowY, colWidthTable, rowHeight);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      let textWidth =
        (doc.getStringUnitWidth(day) * doc.getFontSize()) /
        doc.internal.scaleFactor;
      let textX = tableX + (colWidthTable - textWidth) / 2;

      doc.text(day, textX, rowY + 5);

      for (let col = 1; col < columns.length; col++) {
        doc.rect(tableX + col * colWidthTable, rowY, colWidthTable, rowHeight);
      }
    });
    currentY += days.length * rowHeight;

    informeData.control_tiempo.forEach((control) => {
      let dateParts = control.fecha.split("-");
      let date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

      let dayIndex = date.getDay() - 1;

      if (dayIndex < 0 || dayIndex > 5) return;

      let rowY = dayRows[days[dayIndex]];

      doc.setFont("helvetica", "normal");

      let texts = [
        control.fecha,
        control.viaje_ida,
        control.trabajo || "",
        control.viaje_vuelta,
        control.total_hh_viaje || "",
        control.total_hh_trabajo || "",
      ];

      texts.forEach((text, idx) => {
        let textWidth =
          (doc.getStringUnitWidth(text) * doc.getFontSize()) /
          doc.internal.scaleFactor;
        let textX =
          tableX + colWidthTable * (idx + 1) + (colWidthTable - textWidth) / 2; // Centramos el texto
        doc.text(text, textX, rowY + 5);
      });
    });
    currentY += 0;

    //-------------------------------------------------------------

    // Firmas
    let signatureRowY = currentY;
    const signatureColWidth = availableWidth / 2;
    doc.rect(tableX, signatureRowY, signatureColWidth, rowHeight + 12);
    doc.rect(
      tableX + signatureColWidth,
      signatureRowY,
      signatureColWidth,
      rowHeight + 12
    );
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    let signatureTextY = signatureRowY + 10 + rowHeight - 2;
    doc.text("Firma Cliente", tableX + signatureColWidth / 2, signatureTextY, {
      align: "center",
    });
    let signature1TextY = signatureRowY + 6 + rowHeight - 2;
    doc.text(
      "________________________",
      tableX + signatureColWidth / 2,
      signature1TextY,
      { align: "center" }
    );
    let signatureTextY2 = signatureRowY + 10 + rowHeight - 2;
    doc.text(
      "Firma Técnico",
      tableX + signatureColWidth * 1.5,
      signatureTextY2,
      {
        align: "center",
      }
    );
    let signature2TextY2 = signatureRowY + 6 + rowHeight - 2;
    doc.text(
      "________________________",
      tableX + signatureColWidth * 1.5,
      signature2TextY2,
      { align: "center" }
    );
    currentY = signatureRowY + rowHeight;
    let rutRowY = currentY + 12;
    doc.rect(tableX, rutRowY, totalWidth, rowHeight + 8);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text(
      "Nombre:_____________________",
      tableX + 2,
      rutRowY + rowHeight - 3
    ); // Colocamos el texto cerca de la parte inferior de la celda, alineado a la izquierda
    doc.text(
      "RUT      :_____________________",
      tableX + 2,
      rutRowY + 4 + rowHeight - 3
    );
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text(
      "Certifico que el tecnico a efectuado los trabajos arriba descritos, dejando el equipo funcionando a mi entera satisfaccion.",
      tableX + 2,
      rutRowY + 8 + rowHeight - 3
    );
    currentY = rutRowY + rowHeight;

    //___________________________________________________________________________________________

    // Observaciones
    let observationsRowY = currentY + 8;
    doc.rect(tableX, observationsRowY, totalWidth, rowHeight);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("Observaciones:", tableX + 2, observationsRowY + rowHeight - 3);

    currentY = observationsRowY + rowHeight;
    doc.save(`Informe_Trabajo_${informeData.id_it}.pdf`);
  } catch (error) {
    console.error("Error al generar el PDF:", error);
  }
};

