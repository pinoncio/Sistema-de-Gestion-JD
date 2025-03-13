import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import logoImage from "./../assets/images/logo.jpg";
import { getIt } from "../Services/itService";
import { useParams } from "react-router-dom";

const PdfPreview = () => {
    const { id_it } = useParams();// Obtenemos el id_it desde la URL
    const [pdfUrl, setPdfUrl] = useState("");
    const [informeData, setInformeData] = useState(null); // Estado para almacenar la data

    useEffect(() => {
        const fetchInformeData = async () => {
            try {
                const data = await getIt(id_it);
                setInformeData(data);
                console.log("Datos obtenidos:", data)
            } catch (error) {
                console.error("Error al obtener el informe de trabajo:", error);
            }
        };

        if (id_it) {
            fetchInformeData();
        }
    }, [id_it]);

    const generateBlankPdf = () => {
        const doc = new jsPDF();
        const logo = logoImage;
        doc.addImage(logo, "JPG", 10, 5, 35, 33);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.text("+569 4420 6238", 55, 20)
        doc.text("jsepulveda@jdservice.cl", 55, 24)
        doc.text("N° Orden", 175, 15)
        doc.text("Fecha Visita", 152, 29)
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        //Fecha de visita
        //______________________________________________________________________
        // Asegúrate de obtener la fecha del primer elemento en control_tiempo
        const fecha = informeData?.control_tiempo?.[0]?.fecha;
        const [year, month, day] = fecha.split("-");
        const dateParts = [day, month, year];
        const labels = ["Día", "Mes", "Año"];
        let x = 170, y = 23, width = 10, height = 8;
        dateParts.forEach((part, index) => {
            doc.rect(x + (width * index), y, width, height);
            let textX = x + (width * index) + width / 2;
            let textY = y + height / 2 + 2.5;
            doc.text(part, textX, textY, { align: "center" });
            let labelY = y + 3;
            doc.text(labels[index], textX, labelY, { align: "center" });
        });
        //-----------------------------------------
        // Informe de atencion

        let tableX = 10, tableY = 31, rowHeight = 8, colWidth = 95;
        doc.rect(tableX, tableY, colWidth * 2, rowHeight);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text("Informe de Atencion", tableX + (colWidth), tableY + 5, { align: "center" });
        tableY += rowHeight;

        //------------------------------------------
        // Recuadro con columnas de información

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        const column1 = ["Tecnico:", "Cliente:", "Direccion:", "Maquina:", "Modelo:", "N° Serie:", "Km Salida:"];
        const column2 = ["", "R.U.T:", "Fono:", "Correo:", "Horometro:", "N° Motor:", "Km Retorno:"];
        
        const values1 = [
            String(informeData?.tecnico || ""),
            String(informeData?.cliente?.nombre_razon_social || ""),
            String(informeData?.cliente?.direccion || ""),
            String(informeData?.maquina || ""),
            String(informeData?.modelo || ""),
            String(informeData?.numero_serie || ""),
            String(informeData?.km_salida || "")
        ];
        
        const values2 = [
            "",
            String(informeData?.cliente?.rut || ""),
            String(informeData?.cliente?.informacion_de_pago?.telefono_responsable || ""),
            String(informeData?.cliente?.informacion_de_pago?.correo_electronico || ""),
            String(informeData?.horometro || ""),
            String(informeData?.numero_motor || ""),
            String(informeData?.km_retorno || "")
        ];
        
        const maxRows = Math.max(column1.length, column2.length);
        for (let i = 0; i < maxRows; i++) {
            // Mantener los cuadros existentes
            doc.rect(tableX, tableY + (rowHeight * i), colWidth, rowHeight);
            doc.setFont("helvetica", "bold");
            doc.text(column1[i] || "", tableX + 2, tableY + 5 + (rowHeight * i)); // Etiquetas izquierda
            doc.setFont("helvetica", "normal");
            doc.text(values1[i] || "", tableX + 20, tableY + 5 + (rowHeight * i)); // Valores izquierda
            doc.setFont("helvetica", "bold");
            doc.rect(tableX + colWidth, tableY + (rowHeight * i), colWidth, rowHeight);
            doc.text(column2[i] || "", tableX + colWidth + 2, tableY + 5 + (rowHeight * i)); // Etiquetas derecha
            doc.setFont("helvetica", "normal");
            doc.text(values2[i] || "", tableX + (colWidth * 2) - 70, tableY + 5 + (rowHeight * i)); // Valores derecha
        }
        

        //--------------------------------------------------------------

        //Informe Tecnico
        doc.setFont("helvetica", "bold");
        let lastRowY = tableY + (rowHeight * maxRows);
        doc.rect(tableX, lastRowY, colWidth * 2, rowHeight);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        let textX = tableX + (colWidth); // Centrar horizontalmente en ambas columnas
        let textY = lastRowY + (rowHeight / 2) + 1; // Ajuste fino para centrar verticalmente
        doc.text("Informe Técnico", textX, textY, { align: "center" });

        //-----------------------------------------------------------

        // Contenido Informe Tecnico

        let currentY = tableY + (rowHeight * maxRows) + rowHeight;
        const newRows = [
            { title: "Queja o Síntomas:", value: informeData?.queja_sintoma || "" },
            { title: "Diagnóstico:", value: informeData?.diagnostico || "" },
            { title: "Pieza Causante de la Falla:", value: informeData?.pieza_falla || "" },
            { title: "Solución", value: "" } 
        ];
        
        let totalWidth = colWidth * 2;
        let secondColumnWidth = 100;
        let firstColumnWidth = totalWidth;
        newRows.forEach(({ title, value }) => {
            doc.rect(tableX, currentY, firstColumnWidth, rowHeight); 
            doc.setFont("helvetica", "bold");
            doc.setFontSize(8);
            doc.text(title, tableX + 2, currentY + (rowHeight / 2) + 2); 
            doc.setFont("helvetica", "normal");
            doc.text(value, tableX + 40 + 2, currentY + (rowHeight / 2) + 2); 
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
            { title: "Insumos:", value: informeData?.insumo || "" }
        ];
        data.forEach(({ title, value }, i) => {
            let rowY = emptyRowStart + (rowHeight * (2 + i));
            doc.rect(tableX , rowY, secondColumnWidth +30, rowHeight); // Recuadro para el título
            doc.setFont("helvetica", "bold");
            doc.text(title, tableX + 130 + 2, rowY + (rowHeight / 2) + 2); // Título
            doc.setFont("helvetica", "normal");
            doc.text(value, tableX  + 147, rowY + (rowHeight / 2) + 2); // Valor con separación
        });
        


        //---------------------------------------------------------------------------------------------------------------------------------

        //Control de tiempo

        doc.rect(tableX, currentY, totalWidth, rowHeight); // Dibuja la nueva fila
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        let text = "Control de tiempo";
        let textWidth = doc.getStringUnitWidth(text) * doc.getFontSize() / doc.internal.scaleFactor;
        let textXControl = tableX + (totalWidth - textWidth) / 2; // Centrado horizontal (renombrado)
        doc.text(text, textXControl, currentY + (rowHeight / 2) + 1);
        currentY += rowHeight;

        //__________________________________________________________

        //data Control de tiempo-----------

        const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const columns = ["Día", "Fecha", "Viaje", "Trabajo", "Viaje", "Total HH viaje", "Total HH trabajo"];
        const pageWidth = 210;
        const margin = 10;
        const availableWidth = pageWidth - 2 * margin;
        const numColumns = columns.length;
        colWidth = availableWidth / numColumns;
        for (let col = 0; col < columns.length; col++) {
            doc.rect(tableX + col * colWidth, currentY, colWidth, rowHeight);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(8);
            doc.text(columns[col], tableX + (col * colWidth) + 2, currentY + 5);
        }
        currentY += rowHeight;
        days.forEach((day, index) => {
            doc.rect(tableX, currentY, colWidth, rowHeight);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(8);
            doc.text(day, tableX + 2, currentY + 5);
            for (let col = 1; col < columns.length; col++) {
                doc.rect(tableX + col * colWidth, currentY, colWidth, rowHeight);
                doc.text("", tableX + (col * colWidth) + 2, currentY + 5); // Celdas vacías
            }
            currentY += rowHeight;
        });
        informeData.control_tiempo.forEach((control) => {
            // Convertir la fecha a un objeto Date para determinar el día de la semana
            let date = new Date(control.fecha);
            let dayIndex = date.getDay() - 1; // Restar 1 porque getDay() devuelve 0 para domingo
            if (dayIndex < 0 || dayIndex > 5) return; // Asegurar que solo se impriman días de Lunes a Sábado
        
            let rowY = currentY + (dayIndex * rowHeight); // Determinar la fila correcta según el día
        
            // Imprimir la fecha en la segunda columna
            doc.setFont("helvetica", "normal");
            doc.text(control.fecha, tableX + colWidth + 2, rowY + 5);
        
            // Imprimir datos en sus respectivas columnas
            doc.text(control.viaje_ida, tableX + (colWidth * 2) + 2, rowY + 5);
            doc.text(control.trabajo || "", tableX + (colWidth * 3) + 2, rowY + 5);
            doc.text(control.viaje_ret, tableX + (colWidth * 4) + 2, rowY + 5);
            doc.text(control.total_hh_viaje || "", tableX + (colWidth * 5) + 2, rowY + 5);
            doc.text(control.total_hh_trabajo || "", tableX + (colWidth * 6) + 2, rowY + 5);
        });
        

        //-------------------------------------------------------------

        // Firmas
        let signatureRowY = currentY;
        const signatureColWidth = availableWidth / 2;
        doc.rect(tableX, signatureRowY, signatureColWidth, rowHeight + 12);
        doc.rect(tableX + signatureColWidth, signatureRowY, signatureColWidth, rowHeight + 12);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        let signatureTextY = signatureRowY + 10 + rowHeight - 2;
        doc.text("Firma Cliente", tableX + signatureColWidth / 2, signatureTextY, { align: "center" });
        let signature1TextY = signatureRowY + 6 + rowHeight - 2;
        doc.text("________________________", tableX + signatureColWidth / 2, signature1TextY, { align: "center" });
        let signatureTextY2 = signatureRowY + 10 + rowHeight - 2;
        doc.text("Firma Técnico", tableX + signatureColWidth * 1.5, signatureTextY2, { align: "center" });
        let signature2TextY2 = signatureRowY + 6 + rowHeight - 2;
        doc.text("________________________", tableX + signatureColWidth * 1.5, signature2TextY2, { align: "center" });
        currentY = signatureRowY + rowHeight;
        let rutRowY = currentY + 12;
        doc.rect(tableX, rutRowY, totalWidth, rowHeight + 8);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.text("Nombre:_____________________", tableX + 2, rutRowY + rowHeight - 3); // Colocamos el texto cerca de la parte inferior de la celda, alineado a la izquierda
        doc.text("RUT      :_____________________", tableX + 2, rutRowY + 4 + rowHeight - 3);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.text("Certifico que el tecnico a efectuado los trabajos arriba descritos, dejando el equipo funcionando a mi entera satisfaccion.", tableX + 2, rutRowY + 8 + rowHeight - 3);
        currentY = rutRowY + rowHeight;

        //___________________________________________________________________________________________

        // Observaciones
        let observationsRowY = currentY + 8;
        doc.rect(tableX, observationsRowY, totalWidth, rowHeight);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.text("Observaciones:", tableX + 2, observationsRowY + rowHeight - 3);

        currentY = observationsRowY + rowHeight;


        const pdfBlob = doc.output("blob");
        setPdfUrl(URL.createObjectURL(pdfBlob));
    };

    return (
        <div>
            <h2>Vista Previa del PDF</h2>
            <button onClick={generateBlankPdf}>Generar PDF en blanco</button>
            {pdfUrl && (
                <iframe title="Vista previa del PDF" src={pdfUrl} width="100%" height="600px"></iframe>
            )}
        </div>
    );
};

export default PdfPreview;
