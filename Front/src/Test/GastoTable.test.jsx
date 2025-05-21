// GastoTable.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import GastoTable from '../Components/GastoTable';
import { BrowserRouter } from 'react-router-dom';

const mockGastos = [
  {
    id_gasto: 1,
    item_gasto: 'Compra materiales',
    fecha_compra: '2024-05-10',
    metodo_pago: 'Transferencia',
    pago_neto: 10000,
    iva: 1900,
    total_pagado: 11900,
    nro_factura: 123,
    proveedor: 'Proveedor A',
    id_cliente: 5,
    ots: [{ id_ot: 101 }],
  },
];

const getClienteName = (id) => `Cliente ${id}`;

describe('GastoTable', () => {
  test('muestra datos correctamente en la tabla', () => {
    render(
      <BrowserRouter>
        <GastoTable gastos={mockGastos} onDelete={() => {}} onEdit={() => {}} getClienteName={getClienteName} />
      </BrowserRouter>
    );

    expect(screen.getByText('N°1')).toBeInTheDocument(); // id_gasto
    expect(screen.getByText('Compra materiales')).toBeInTheDocument(); // item_gasto
    expect(screen.getByText('N°101')).toBeInTheDocument(); // id_ot
    expect(screen.getByText('2024-05-10')).toBeInTheDocument(); // fecha_compra
    expect(screen.getByText('Transferencia')).toBeInTheDocument(); // metodo_pago
    expect(screen.getByText('$10.000')).toBeInTheDocument(); // pago_neto
    expect(screen.getByText('$1.900')).toBeInTheDocument(); // iva
    expect(screen.getByText('$11.900')).toBeInTheDocument(); // total_pagado
    expect(screen.getByText('123')).toBeInTheDocument(); // nro_factura
    expect(screen.getByText('Proveedor A')).toBeInTheDocument(); // proveedor
    expect(screen.getByText('Cliente 5')).toBeInTheDocument(); // cliente
  });

  test('llama a onEdit y onDelete correctamente', () => {
  const onEdit = jest.fn();
  const onDelete = jest.fn();

  render(
    <BrowserRouter>
      <GastoTable gastos={mockGastos} onDelete={onDelete} onEdit={onEdit} getClienteName={getClienteName} />
    </BrowserRouter>
  );

  const editarBtn = screen.getByTestId('editar-btn');
  const eliminarBtn = screen.getByTestId('eliminar-btn');

  fireEvent.click(editarBtn);
  fireEvent.click(eliminarBtn);

  expect(onEdit).toHaveBeenCalledWith(mockGastos[0]);
  expect(onDelete).toHaveBeenCalledWith(1);
});

});
