import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logoImage from './../assets/images/logo.jpg'; // Importa tu logo desde la carpeta assets
import { useParams } from 'react-router-dom'; // Importa useParams
import getOtData from './../Services/getOtData'; // Importamos el servicio

const drawTextInBox = (doc, x, y, width, height, title, content, alignment = 'left', lineWidth = 0.5, titleFontSize = 14, contentFontSize = 10) => {
  // Ajustar el grosor del borde
  doc.setLineWidth(lineWidth); // Ajusta el grosor del borde (en milímetros)

  // Dibujar el recuadro
  doc.setDrawColor(0, 0, 0); // Color del borde (negro)
  doc.setFillColor(255, 255, 255); // Color de fondo (gris claro)
  doc.rect(x, y, width, height, 'FD'); // Dibuja y rellena el recuadro

  // Añadir el título dentro del recuadro
  doc.setFont("helvetica", "bold");

  doc.setFontSize(titleFontSize);

  const titleWidth = doc.getTextWidth(title); // Ancho del título

  let titleX = x + 5; // Margen a la izquierda por defecto
  if (alignment === 'center') {
    titleX = x + (width - titleWidth) / 2; // Centrado
  } else if (alignment === 'right') {
    titleX = x + width - titleWidth - 5; // Alineado a la derecha
  }

  doc.text(title, titleX, y + 7); // Colocar el título

  // Añadir el contenido dentro del recuadro
  doc.setFont("helvetica", "bold");
  doc.setFontSize(contentFontSize);
  const contentWidth = doc.getTextWidth(content); // Ancho del contenido

  let contentX = x + 5; // Margen a la izquierda por defecto
  if (alignment === 'center') {
    contentX = x + (width - contentWidth) / 2; // Centrado
  } else if (alignment === 'right') {
    contentX = x + width - contentWidth - 5; // Alineado a la derecha
  }

  doc.text(content, contentX, y + 14); // Colocar el contenido
};



const GeneratePdf = () => {
  const { id_ot } = useParams(); // Obtiene el id_ot de la URL
  const [otData, setOtData] = useState(null);

  // Llamar a getOtData cuando el id_ot cambie
  useEffect(() => {
    if (id_ot) {
      getOtData(id_ot)
        .then((data) => {
          setOtData(data); // Establece los datos de la OT en el estado
        })
        .catch((error) => {
          console.error("Error al obtener los datos de la OT:", error.message);
        });
    }
  }, [id_ot]);

  const generatePDF = () => {
    if (!otData) {
      console.log("No hay datos para generar el PDF");
      return;
    }

    const doc = new jsPDF();

    // Convierte la imagen importada en base64
    const logo = logoImage; // Asumiendo que la imagen está en base64

    // Agregar el logo
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


    drawTextInBox(doc, 140, 10, 60, 20, "ORDEN DE TRABAJO", `Nº ${otData.id_ot}`, 'center', 0.7, 10, 10);


    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Fecha emisión: ${new Date(otData.fecha_solicitud).toLocaleDateString()}`, 160, 47);

    // Cliente

    const contentCol1 = [
      { text: `Señor(es):`, yOffset: 10 },
      { text: `Dirección:`, yOffset: 16 },
      { text: `Giro:`, yOffset: 22 },
      { text: `Tipo OT:`, yOffset: 28 },
      { text: `Prioridad:`, yOffset: 34 },
      { text: `Vendedor:`, yOffset: 40 }
    ];

    const contentCol2 = [
      { text: `${otData.cliente.nombre_razon_social}`, yOffset: 10 },
      { text: `${otData.cliente.direccion}`, yOffset: 16 },
      { text: `${otData.cliente.giro}`, yOffset: 22 },
      { text: `${otData.tipo_ot}`, yOffset: 28 },
      { text: `${otData.prioridad}`, yOffset: 34 },
      { text: `${otData.vendedor}`, yOffset: 40 }
    ];

    const contentCol3 = [
      { text: `RUT:`, yOffset: 10 },
      { text: `Comuna:`, yOffset: 16 },
      { text: `Ciudad:`, yOffset: 22 },
      { text: `Entrega:`, yOffset: 28 },
      { text: `Forma pago:`, yOffset: 34 }
    ];

    const contentCol4 = [
      { text: `${otData.cliente.rut}`, yOffset: 10 },
      { text: `${otData.cliente.comuna}`, yOffset: 16 },
      { text: `${otData.cliente.ciudad}`, yOffset: 22 },
      { text: `${new Date(otData.fecha_entrega).toLocaleDateString()}`, yOffset: 28 },
      { text: `${otData.cliente.clientemetodospago[0]?.metodopago?.nombre_metodo}`, yOffset: 34 }
    ];

    // Coordenadas y tamaño del recuadro
    const x = 10;
    const y = 50; // Coordenada Y inicial para las cuatro columnas
    const columnWidth = 48; // Ancho de cada columna (ajustado para 4 columnas)
    const height = 60; // Altura del recuadro (lo mismo para todas las columnas)

    // Dibujar el recuadro
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 0, 0); // Color de borde (negro)
    doc.setFillColor(255, 255, 255); // Color de fondo blanco
    doc.rect(x, y, columnWidth * 4, height, 'FD'); // Dibuja y rellena el recuadro (con el ancho de 4 columnas)

    // Ajustar el tamaño de la letra para el contenido
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);

    // Dibujar los datos de la columna 1
    contentCol1.forEach(item => {
      doc.text(item.text, x + 5, y + item.yOffset);
    });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    // Dibujar los datos de la columna 2 (con un `xOffset` mayor para moverla a la derecha)
    const xCol2 = x + columnWidth - 23; // Coordenada X para la segunda columna
    contentCol2.forEach(item => {
      doc.text(item.text, xCol2, y + item.yOffset);
    });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    // Dibujar los datos de la columna 3 (con un `xOffset` mayor para moverla a la derecha)
    const xCol3 = x + columnWidth * 2 + 35; // Coordenada X para la tercera columna
    contentCol3.forEach(item => {
      doc.text(item.text, xCol3, y + item.yOffset);
    });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    // Dibujar los datos de la columna 4 (con un `xOffset` mayor para moverla a la derecha)
    const xCol4 = x + columnWidth * 3 + 10; // Coordenada X para la cuarta columna
    contentCol4.forEach(item => {
      doc.text(item.text, xCol4, y + item.yOffset);
    });

    const yObservaciones = y + height; // Espacio después de la primera tabla
    const obsWidth = (columnWidth * 4) / 2; // Cada observación ocupa la mitad del ancho
    const obsHeight = 20;

    // Dibujar el recuadro de observaciones
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(255, 255, 255);
    doc.rect(x, yObservaciones, obsWidth * 2, 20, 'FD'); // Recuadro para ambas observaciones

    const xDiv = x + obsWidth; // Posición X de la línea (mitad del recuadro)
    doc.line(xDiv, yObservaciones, xDiv, yObservaciones + obsHeight); // Línea vertical

    // Dibujar títulos en negrita
    doc.setFont("helvetica", "bold");
    doc.text("Observación Inicial:", x + 5, yObservaciones + 8);
    doc.text("Observación Final:", x + obsWidth + 5, yObservaciones + 8);

    // Dibujar espacio para el texto de observaciones
    doc.setFont("helvetica", "normal");


    const finalY = yObservaciones + obsHeight + 1;


    // Tabla de insumos
    autoTable(doc, {
      startY: finalY + 10, // Ubicación de la tabla debajo de observaciones
      tableWidth: 'auto',
      margin: { left: x - 1, right: x - 2 }, // Expande la tabla 1 unidad a la izquierda y derecha
    
      // **Estilos del encabezado**
      headStyles: {
        fillColor: [255, 255, 255], // Azul fuerte en encabezados
        textColor: [0, 0, 0], // Texto blanco
        fontStyle: 'bold',
        halign: 'center'
      },
    
      // **Estilos generales**
      styles: {
        textColor: [0, 0, 0], // Texto negro
        halign: 'center',
        lineWidth: 0, // Elimina las líneas internas
      },
    
      // **Colores alternos en filas**
      didParseCell: function (data) {
        if (data.section === 'body') {
          data.cell.styles.fillColor = data.row.index % 2 === 0 ? [255, 255, 255] : [255, 255, 255]; // Gris en pares, blanco en impares
        }
      },
    
      // **Mantener bordes exteriores**
      didDrawCell: function (data) {
        if (data.section === 'body' || data.section === 'head') {
          const { cell, row, column } = data;
          const { x, y, width, height } = cell;
          doc.setDrawColor(0, 0, 0); // Color negro
          doc.setLineWidth(0.5); // Grosor de línea
    
          // Dibuja los bordes externos de la tabla
          if (column.index === 0) doc.line(x, y, x, y + height); // Borde izquierdo
          if (column.index === data.table.columns.length - 1) doc.line(x + width, y, x + width, y + height); // ✅ Borde derecho corregido
          if (row.index === 0) doc.line(x, y, x + width, y); // Borde superior
          if (row.index === data.table.body.length - 1) doc.line(x, y + height, x + width, y + height); // Borde inferior
        }
      },
    
      head: [
        ["Código", "Descripción", "Cant.", "Precio", "Dscto.(%)", "Recargo", "Af/Ex", "Valor"]
      ],
      body: [
        // Primero agregamos los insumos
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
    
        // Luego agregamos los productos como filas adicionales
        ...otData.productos.map((item) => [
          item.id_producto, // Supongo que el campo del código del producto es `id_producto`
          item.nombre_producto, // Suponiendo que el nombre del producto es `nombre_producto`
          item.cantidad_producto, // Supongo que la cantidad del producto es `cantidad_producto`
          item.precio_unitario, // Suponiendo que el precio unitario es `precio_unitario`
          item.descuento_producto, // Supongo que el descuento del producto es `descuento_producto`
          item.recargo_producto, // Supongo que el recargo del producto es `recargo_producto`
          item.af_ex, // Suponiendo que el af/ex del producto es `af_ex_producto`
          item.precio_total, // Suponiendo que el precio total es `precio_total_producto`
        ])
      ]
    });
    
    
    



    const newFinalY = doc.lastAutoTable.finalY;
    doc.text(`Nº líneas: ${otData.ot_insumo.length} / Cant: ${otData.ot_insumo.reduce((acc, item) => acc + item.cantidad_insumo, 0)}`, 15, newFinalY + 10);
    doc.text("Observaciones generales:", 15, newFinalY + 15);
    doc.text(otData.observaciones || "Sin observaciones", 15, newFinalY + 20);

    // Totales fuera del recuadro (en la columna derecha)
    doc.text(`Subtotal: $ ${otData.sub_total}`, 140, newFinalY + 10);
    doc.text(`Monto neto: $ ${otData.monto_neto}`, 140, newFinalY + 15);
    doc.text(`IVA (%): $ ${otData.iva}`, 140, newFinalY + 20);
    doc.text(`Total: $ ${otData.total}`, 140, newFinalY + 25);

    // Información adicional
    doc.text("Desarrollado por relBase.cl 2024", 15, newFinalY + 35);

    // Guardar el documento PDF
    doc.save("orden_trabajo.pdf");
  };

  return (
    <div>
      <button onClick={generatePDF} disabled={!otData}>
        Generar PDF
      </button>
    </div>
  );
};

export { GeneratePdf };
