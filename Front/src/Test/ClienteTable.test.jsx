import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // <- importa MemoryRouter
import ClienteTable from "../Components/ClienteTable";

// Mock localStorage para setear rol de usuario
const setUserRol = (rol) => {
  localStorage.setItem("user", JSON.stringify({ rol }));
};

describe("ClienteTable", () => {
  const clientesMock = [
    {
      id_cliente: 1,
      codigo_cliente: "C001",
      nombre_razon_social: "Empresa Uno S.A.",
      nombre_fantasia: "Fantasia Uno",
      rut: "12.345.678-9",
      giro: "Comercio",
      cliente_vigente: true,
    },
    {
      id_cliente: 2,
      codigo_cliente: "C002",
      nombre_razon_social: "Empresa Dos Ltda.",
      nombre_fantasia: "Fantasia Dos",
      rut: "98.765.432-1",
      giro: "Servicios",
      cliente_vigente: false,
    },
  ];

  const onEditMock = jest.fn();
  const onDeleteMock = jest.fn();
  const onToggleStatusMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza la tabla con clientes", () => {
    setUserRol(1); // rol que muestra todos botones

    render(
      <MemoryRouter>
        <ClienteTable
          clientes={clientesMock}
          onEdit={onEditMock}
          onDelete={onDeleteMock}
          onToggleStatus={onToggleStatusMock}
        />
      </MemoryRouter>
    );

    // Check headers
    expect(screen.getByText(/código/i)).toBeInTheDocument();
    expect(screen.getByText(/razón social/i)).toBeInTheDocument();

    // Check data
    expect(screen.getByText("Empresa Uno S.A.")).toBeInTheDocument();
    expect(screen.getByText("Fantasia Dos")).toBeInTheDocument();
  });

  test("click en botones llama a funciones con datos correctos", () => {
    setUserRol(2); // rol con boton eliminar

    render(
      <MemoryRouter>
        <ClienteTable
          clientes={clientesMock}
          onEdit={onEditMock}
          onDelete={onDeleteMock}
          onToggleStatus={onToggleStatusMock}
        />
      </MemoryRouter>
    );

    // Botón ver
    const verBtns = screen.getAllByTestId("ver-btn");
    expect(verBtns).toHaveLength(clientesMock.length);
    fireEvent.click(verBtns[0]);

    // Botón editar (userRol 2 puede editar)
    const editarBtns = screen.getAllByTestId("editar-btn");
    expect(editarBtns).toHaveLength(clientesMock.length);
    fireEvent.click(editarBtns[1]);
    expect(onEditMock).toHaveBeenCalledWith(clientesMock[1]);

    // Botón eliminar (solo para rol 2)
    const eliminarBtns = screen.getAllByTestId("eliminar-btn");
    expect(eliminarBtns).toHaveLength(clientesMock.length);
    fireEvent.click(eliminarBtns[0]);
    expect(onDeleteMock).toHaveBeenCalledWith(clientesMock[0].id_cliente);
  });

  test("toggle switch llama a onToggleStatus con los valores correctos", () => {
    setUserRol(1);

    render(
      <MemoryRouter>
        <ClienteTable
          clientes={clientesMock}
          onEdit={onEditMock}
          onDelete={onDeleteMock}
          onToggleStatus={onToggleStatusMock}
        />
      </MemoryRouter>
    );

    // Obtengo todos los switches
    const switches = screen.getAllByRole("checkbox");
    expect(switches).toHaveLength(clientesMock.length);

    // Simulo toggle del primero (activo -> inactivo)
    fireEvent.click(switches[0]);
    expect(onToggleStatusMock).toHaveBeenCalledWith(
      clientesMock[0].id_cliente,
      false
    );
  });

  test("botones ocultos o deshabilitados según rol", () => {
    setUserRol(3); // rol que no puede editar ni activar switch

    render(
      <MemoryRouter>
        <ClienteTable
          clientes={clientesMock}
          onEdit={onEditMock}
          onDelete={onDeleteMock}
          onToggleStatus={onToggleStatusMock}
        />
      </MemoryRouter>
    );

    // Switch deshabilitado
    const switches = screen.getAllByRole("checkbox");
    expect(switches[0]).toBeDisabled();

    // Botón editar no aparece
    expect(screen.queryByTestId("editar-btn")).toBeNull();

    // Botón eliminar no aparece (solo rol 2 puede eliminar)
    expect(screen.queryByTestId("eliminar-btn")).toBeNull();
  });
});
