import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MaquinaFormModal from "../Components/MaquinaFormModal";

describe("MaquinaFormModal", () => {
  const mockProps = {
    open: true,
    onClose: jest.fn(),
    onSubmit: jest.fn(),
    maquinaData: null,
    editing: false,
    setEditing: jest.fn(),
    setEditId: jest.fn(),
    clientes: [
      { id_cliente: "1", nombre_razon_social: "Empresa Uno S.A." },
      { id_cliente: "2", nombre_razon_social: "Cliente 2 Actualizados" },
    ],
  };

  it("renderiza campos correctamente", () => {
    render(<MaquinaFormModal {...mockProps} />);
    expect(screen.getByLabelText(/Cliente/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre de la Máquina/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Modelo de la Máquina/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Número de Serie/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Número de Motor/i)).toBeInTheDocument();
  });

  it("muestra error si faltan campos obligatorios y no envía", () => {
    render(<MaquinaFormModal {...mockProps} />);
    fireEvent.submit(screen.getByRole("button", { name: /crear/i }));

    expect(
      screen.getByText(/Todos los campos obligatorios deben ser llenados/i)
    ).toBeInTheDocument();
    expect(mockProps.onSubmit).not.toHaveBeenCalled();
  });

  it("envía el formulario si los datos son válidos", async () => {
  render(<MaquinaFormModal {...mockProps} />);
  const user = userEvent.setup();

  // Seleccionar cliente por etiqueta
  const selectCliente = screen.getByLabelText(/cliente/i);
  await user.click(selectCliente);

  // Seleccionar la opción del cliente
  const optionCliente = await screen.findByText("Empresa Uno S.A.");
  await user.click(optionCliente);

  // Completar los campos del formulario
  fireEvent.change(screen.getByLabelText(/nombre de la máquina/i), {
    target: { value: "Máquina 1" },
  });
  fireEvent.change(screen.getByLabelText(/modelo de la máquina/i), {
    target: { value: "Modelo X" },
  });
  fireEvent.change(screen.getByLabelText(/número de serie/i), {
    target: { value: "SN12345" },
  });
  fireEvent.change(screen.getByLabelText(/número de motor/i), {
    target: { value: "MTR6789" },
  });

  // Enviar el formulario
  const submitButton = screen.getByRole("button", { name: /crear/i });
  fireEvent.click(submitButton);

  // Asegurar que se llama al onSubmit con los datos correctos
  await waitFor(() => {
    expect(mockProps.onSubmit).toHaveBeenCalledWith({
      id_cliente: "1",
      nombre_maquina: "Máquina 1",
      modelo_maquina: "Modelo X",
      numero_serie: "SN12345",
      numero_motor: "MTR6789",
    });
  });
});


  it("actualiza el formulario y envía los datos modificados", async () => {
    const existingMachine = {
      id_cliente: "2",
      nombre_maquina: "Máquina vieja",
      modelo_maquina: "Modelo Y",
      numero_serie: "SN98765",
      numero_motor: "MTR4321",
    };

    render(
      <MaquinaFormModal
        {...mockProps}
        maquinaData={existingMachine}
        editing={true}
      />
    );
    const user = userEvent.setup();

    // Cambiar nombre de la máquina
    fireEvent.change(screen.getByLabelText(/Nombre de la Máquina/i), {
      target: { value: "Máquina nueva" },
    });

    // Cambiar cliente
    const selectCliente = screen.getByLabelText(/cliente/i);
    await user.click(selectCliente);
    const optionCliente = await screen.findByText("Empresa Uno S.A.");
    await user.click(optionCliente);

    fireEvent.submit(screen.getByRole("button", { name: /actualizar/i }));

    expect(mockProps.onSubmit).toHaveBeenCalledWith({
      id_cliente: "1", // cliente cambiado
      nombre_maquina: "Máquina nueva", // nombre cambiado
      modelo_maquina: "Modelo Y",
      numero_serie: "SN98765",
      numero_motor: "MTR4321",
    });
  });
});
