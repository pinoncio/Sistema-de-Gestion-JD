import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import InsumoFormModal from "../Components/InsumoFormModal";

describe("InsumoFormModal", () => {
  const categoriasMock = [
    { id_categoria: "1", nombre_categoria: "Repuestos" },
    { id_categoria: "2", nombre_categoria: "Maestranza" },
  ];

  const onCloseMock = jest.fn();
  const onSubmitMock = jest.fn();
  const setEditingMock = jest.fn();
  const setEditIdMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza formulario con campos vacíos para creación", () => {
    render(
      <InsumoFormModal
        open={true}
        onClose={onCloseMock}
        onSubmit={onSubmitMock}
        insumoData={null}
        editing={false}
        setEditing={setEditingMock}
        setEditId={setEditIdMock}
        categorias={categoriasMock}
      />
    );

    expect(screen.getByText(/Formulario para crear Insumo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Categoria/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tipo de Insumo/i)).toHaveValue("");
    expect(screen.getByLabelText(/Nombre del Insumo/i)).toHaveValue("");
    expect(screen.getByLabelText(/Ubicación/i)).toHaveValue("");
    expect(screen.getByLabelText(/Cantidad/i)).toHaveValue("");
    expect(screen.getByLabelText(/Costo por Unidad/i)).toHaveValue("");
    expect(screen.getByLabelText(/Sub Total/i)).toHaveValue("");
  });

  test("renderiza formulario con datos para edición", () => {
    const insumoData = {
      tipo_insumo: "Tipo1",
      nombre_insumo: "Nombre1",
      ubicacion: "Ubicación1",
      cantidad: "10",
      costo_unidad: "100",
      sub_total: "1000",
      id_categoria: "2",
    };

    render(
      <InsumoFormModal
        open={true}
        onClose={onCloseMock}
        onSubmit={onSubmitMock}
        insumoData={insumoData}
        editing={true}
        setEditing={setEditingMock}
        setEditId={setEditIdMock}
        categorias={categoriasMock}
      />
    );

    expect(screen.getByText(/Formulario para editar Insumo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Categoria/i)).toHaveTextContent("Maestranza");
    expect(screen.getByLabelText(/Tipo de Insumo/i)).toHaveValue("Tipo1");
    expect(screen.getByLabelText(/Nombre del Insumo/i)).toHaveValue("Nombre1");
    expect(screen.getByLabelText(/Ubicación/i)).toHaveValue("Ubicación1");
    expect(screen.getByLabelText(/Cantidad/i)).toHaveValue("10");
    expect(screen.getByLabelText(/Costo por Unidad/i)).toHaveValue("100");
    expect(screen.getByLabelText(/Sub Total/i)).toHaveValue("1000.00");

  });

  test("actualiza subtotal al cambiar cantidad y costo unidad", async () => {
    render(
      <InsumoFormModal
        open={true}
        onClose={onCloseMock}
        onSubmit={onSubmitMock}
        insumoData={null}
        editing={false}
        setEditing={setEditingMock}
        setEditId={setEditIdMock}
        categorias={categoriasMock}
      />
    );

    const cantidadInput = screen.getByLabelText(/Cantidad/i);
    const costoInput = screen.getByLabelText(/Costo por Unidad/i);
    const subtotalInput = screen.getByLabelText(/Sub Total/i);

    fireEvent.change(cantidadInput, { target: { value: "5" } });
    fireEvent.change(costoInput, { target: { value: "10" } });

    // Esperar que se actualice subtotal
    await waitFor(() => {
      expect(subtotalInput).toHaveValue("50.00");
    });
  });

  test("muestra error si nombre inválido", () => {
    render(
      <InsumoFormModal
        open={true}
        onClose={onCloseMock}
        onSubmit={onSubmitMock}
        insumoData={null}
        editing={false}
        setEditing={setEditingMock}
        setEditId={setEditIdMock}
        categorias={categoriasMock}
      />
    );

    const nombreInput = screen.getByLabelText(/Nombre del Insumo/i);
    fireEvent.change(nombreInput, { target: { value: "123" } });

    expect(screen.getByText(/Solo se permiten letras y espacios./i)).toBeInTheDocument();
  });

  test("llama onSubmit con datos correctos y cierra modal al enviar", async () => {
  onSubmitMock.mockResolvedValueOnce();

  render(
    <InsumoFormModal
      open={true}
      onClose={onCloseMock}
      onSubmit={onSubmitMock}
      insumoData={null}
      editing={false}
      setEditing={setEditingMock}
      setEditId={setEditIdMock}
      categorias={categoriasMock}
    />
  );

  // Seleccionar categoria usando mouseDown + click en opcion
  const categoriaSelect = screen.getByLabelText(/Categoria/i);
  fireEvent.mouseDown(categoriaSelect);
  const opcionCategoria = screen.getByRole("option", { name: /Repuestos/i });
  fireEvent.click(opcionCategoria);

  fireEvent.change(screen.getByLabelText(/Tipo de Insumo/i), { target: { value: "TipoX" } });
  fireEvent.change(screen.getByLabelText(/Nombre del Insumo/i), { target: { value: "NombreX" } });
  fireEvent.change(screen.getByLabelText(/Ubicación/i), { target: { value: "UbicaciónX" } });
  fireEvent.change(screen.getByLabelText(/Cantidad/i), { target: { value: "10" } });
  fireEvent.change(screen.getByLabelText(/Costo por Unidad/i), { target: { value: "20" } });

  await waitFor(() => {
    expect(screen.getByLabelText(/Sub Total/i)).toHaveValue("200.00");
  });

  fireEvent.click(screen.getByRole('button', { name: /crear/i }));


  await waitFor(() => {
    expect(onSubmitMock).toHaveBeenCalledWith({
      tipo_insumo: "TipoX",
      nombre_insumo: "NombreX",
      ubicacion: "UbicaciónX",
      cantidad: "10",
      costo_unidad: "20",
      sub_total: "200.00",
      id_categoria: "1",
    });
  });

  expect(setEditingMock).toHaveBeenCalledWith(false);
  expect(setEditIdMock).toHaveBeenCalledWith(null);
  expect(onCloseMock).toHaveBeenCalled();
});



  test("botón cancelar llama onClose", () => {
    render(
      <InsumoFormModal
        open={true}
        onClose={onCloseMock}
        onSubmit={onSubmitMock}
        insumoData={null}
        editing={false}
        setEditing={setEditingMock}
        setEditId={setEditIdMock}
        categorias={categoriasMock}
      />
    );

    fireEvent.click(screen.getByText(/Cancelar/i));
    expect(onCloseMock).toHaveBeenCalled();
  });
});
