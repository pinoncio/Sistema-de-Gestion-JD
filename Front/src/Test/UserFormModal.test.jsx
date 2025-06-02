import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; 
import UserFormModal from "../Components/UserFormModal";

describe("UserFormModal", () => {
  const mockProps = {
    open: true,
    onClose: jest.fn(),
    onSubmit: jest.fn(),
    userData: null,
    editing: false,
    setEditing: jest.fn(),
    setEditId: jest.fn(),
    roles: [
      { id_rol: "admin", nombre_rol: "Administrador" },
      { id_rol: "user", nombre_rol: "Usuario" },
    ],
  };

  it("renderiza campos correctamente", () => {
    render(<UserFormModal {...mockProps} />);

    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rut/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fecha de Nacimiento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rol/i)).toBeInTheDocument();
  });

  it("muestra error si contraseña es muy corta", () => {
    render(<UserFormModal {...mockProps} />);
    const passInput = screen.getByLabelText(/Contraseña/i);
    fireEvent.change(passInput, { target: { value: "123" } });
    expect(screen.getByText(/mínimo de 8 caracteres/i)).toBeInTheDocument();
  });

  it("envía el formulario si los datos son válidos", async () => {
    render(<UserFormModal {...mockProps} />);
    const user = userEvent.setup();

    fireEvent.change(screen.getByLabelText(/Nombre/i), {
      target: { value: "Juan" },
    });
    fireEvent.change(screen.getByLabelText(/Apellido/i), {
      target: { value: "Pérez" },
    });
    fireEvent.change(screen.getByLabelText(/Rut/i), {
      target: { value: "12345678-9" },
    });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: "juan@correo.com" },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: "12345678" },
    });
    fireEvent.change(screen.getByLabelText(/Fecha de Nacimiento/i), {
      target: { value: "2000-01-01" },
    });

    // Seleccionar el rol desde el menú desplegable de Material UI
    const select = screen.getByLabelText(/Rol/i);
    await user.click(select);
    const option = await screen.findByText("Administrador");
    await user.click(option);

    // Enviar formulario
    fireEvent.submit(screen.getByRole("button", { name: /crear/i }));

    expect(mockProps.onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        nombre_usuario: "Juan",
        apellido_usuario: "Pérez",
        rut_usuario: expect.any(String),
        email_usuario: "juan@correo.com",
        contrasenia_usuario: "12345678",
        fecha_nacimiento_usuario: "2000-01-01",
        rol_usuario: "admin",
      })
    );
  });

  it("actualiza el formulario y envía los datos modificados", async () => {
    // Simulamos un usuario existente con datos iniciales
    const existingUser = {
      nombre_usuario: "Carlos",
      apellido_usuario: "Soto",
      rut_usuario: "98765432-1",
      email_usuario: "carlos@correo.com",
      contrasenia_usuario: "password123",
      fecha_nacimiento_usuario: "1990-05-10",
      rol_usuario: "user",
    };

    render(
      <UserFormModal {...mockProps} userData={existingUser} editing={true} />
    );

    const user = userEvent.setup();

    // Cambiamos el nombre y el rol
    const nombreInput = screen.getByLabelText(/Nombre/i);
    fireEvent.change(nombreInput, { target: { value: "Carlos Eduardo" } });

    // Cambiar rol desde select de Material UI
    const select = screen.getByLabelText(/Rol/i);
    await user.click(select);
    const option = await screen.findByText("Administrador");
    await user.click(option);

    // Enviar formulario
    fireEvent.submit(screen.getByRole("button", { name: /actualizar/i }));

    expect(mockProps.onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        nombre_usuario: "Carlos Eduardo",
        apellido_usuario: "Soto", 
        rut_usuario: "98765432-1",
        email_usuario: "carlos@correo.com",
        contrasenia_usuario: "password123",
        fecha_nacimiento_usuario: "1990-05-10",
        rol_usuario: "admin",
      })
    );
  });
});
