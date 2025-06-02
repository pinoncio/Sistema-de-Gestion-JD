
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ClienteFormModal from "../Components/ClienteFormModal";
import '@testing-library/jest-dom';

describe("ClienteFormModal", () => {
  const mockOnSubmit = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("muestra errores al enviar el formulario vacío", async () => {
  render(
    <ClienteFormModal
      open={true}
      onClose={mockOnClose}
      onSubmit={mockOnSubmit}
      clienteData={null}
      editing={false}
      setEditing={() => {}}
      setEditId={() => {}}
    />
  );

  // Simula envío sin llenar campos
  fireEvent.click(screen.getByRole("button", { name: /crear cliente/i }));

  await waitFor(() => {
    // Espera a que aparezcan mensajes de error. Ajusta el texto según tu validador (ej: Yup)
    expect(screen.getAllByText(/obligatorio/i).length).toBeGreaterThan(0);
  });

  // Asegura que no se haya llamado a onSubmit
  expect(mockOnSubmit).not.toHaveBeenCalled();
});


  test("renderiza y envía el formulario con todos los campos", async () => {
    render(
      <ClienteFormModal
        open={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        clienteData={null}
        editing={false}
        setEditing={() => {}}
        setEditId={() => {}}
      />
    );

    // Cliente
    fireEvent.change(screen.getByLabelText(/Código Cliente/i), {
      target: { value: "CL123" },
    });

    fireEvent.change(screen.getByLabelText(/Razón Social/i), {
      target: { value: "Empresa de Prueba SpA" },
    });

    fireEvent.change(screen.getByLabelText(/Nombre Fantasía/i), {
      target: { value: "Prueba Fantasía" },
    });

    // Usa "getByLabelText" parcial para el campo "RUT"
    fireEvent.change(screen.getByLabelText(/rut/i), {
      target: { value: "123456789" },
    });

    fireEvent.change(screen.getByLabelText(/Giro/i), {
      target: { value: "Servicios TI" },
    });

    fireEvent.change(screen.getByLabelText(/Dirección/i), {
      target: { value: "Av. Siempre Viva 123" },
    });

    fireEvent.change(screen.getByLabelText(/Ciudad/i), {
      target: { value: "Santiago" },
    });

    fireEvent.change(screen.getByLabelText(/Comuna/i), {
      target: { value: "Ñuñoa" },
    });

    // Contacto Comercial
    fireEvent.change(screen.getByLabelText(/^Contacto Comercial$/i), {
      target: { value: "Juan Pérez" },
    });

    // OJO: Hay dos "Correo Electrónico", usamos getAllByLabelText
    const correosElectronicos = screen.getAllByLabelText(/^Correo Electrónico$/i);
    fireEvent.change(correosElectronicos[0], {
      target: { value: "juan@empresa.com" },
    });

    fireEvent.change(screen.getByLabelText(/^Teléfono Fijo$/i), {
      target: { value: "22222222" },
    });

    fireEvent.change(screen.getByLabelText(/^Teléfono Celular$/i), {
      target: { value: "912345678" },
    });

    // Información de Pago
    fireEvent.change(screen.getByLabelText(/^Nombre Responsable$/i), {
      target: { value: "María López" },
    });

    // Segundo "Correo Electrónico"
    fireEvent.change(correosElectronicos[1], {
      target: { value: "maria@empresa.com" },
    });

    fireEvent.change(screen.getByLabelText(/^Teléfono Responsable$/i), {
      target: { value: "933333333" },
    });

    // Enviar
    fireEvent.click(screen.getByRole("button", { name: /crear cliente/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    const submittedData = mockOnSubmit.mock.calls[0][0];

    // Verifica algunas claves en minúscula
    expect(submittedData.codigo_cliente).toBe("CL123");
    expect(submittedData.nombre_razon_social).toBe("Empresa de Prueba SpA");
    expect(submittedData.rut).toBe("12.345.678-9");
    expect(submittedData.contacto_comercial.contacto_comercial).toBe("Juan Pérez");
    expect(submittedData.informacion_de_pago.nombre_responsable).toBe("María López");
  });

  test("rellena y envía el formulario en modo edición", async () => {
  const clienteExistente = {
    codigo_cliente: "CL456",
    nombre_razon_social: "Empresa Editada Ltda",
    nombre_fantasia: "Editada Fantasía",
    rut: "98.765.432-1",
    giro: "Consultoría",
    direccion: "Calle Falsa 456",
    ciudad: "Valparaíso",
    comuna: "Viña del Mar",
    contacto_comercial: {
      contacto_comercial: "Ana Torres",
      correo_electronico_comercial: "ana@editada.com",
      telefono_fijo: "2 3333333",
      telefono_celular: "9 87654321",
    },
    informacion_de_pago: {
      nombre_responsable: "Carlos Muñoz",
      correo_electronico: "carlos@editada.com",
      telefono_responsable: "9 44444444",
    },
  };

  render(
    <ClienteFormModal
      open={true}
      onClose={mockOnClose}
      onSubmit={mockOnSubmit}
      clienteData={clienteExistente}
      editing={true}
      setEditing={() => {}}
      setEditId={() => {}}
    />
  );

  // Verifica que los campos estén prellenados
  expect(screen.getByLabelText(/Código Cliente/i)).toHaveValue("CL456");
  expect(screen.getByLabelText(/Razón Social/i)).toHaveValue("Empresa Editada Ltda");
  expect(screen.getByLabelText(/rut/i)).toHaveValue("98.765.432-1");

  // Simula cambios si quieres, opcional:
  fireEvent.change(screen.getByLabelText(/Ciudad/i), {
    target: { value: "La Serena" },
  });

  expect(screen.getByRole("button", { name: /editar cliente/i })).toBeInTheDocument();
fireEvent.click(screen.getByRole("button", { name: /editar cliente/i }));


  await waitFor(() => {
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  const submittedData = mockOnSubmit.mock.calls[0][0];
  expect(submittedData.codigo_cliente).toBe("CL456");
  expect(submittedData.ciudad).toBe("La Serena"); // si cambiaste el valor
});


});
