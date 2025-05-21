import { render, screen, fireEvent, within } from '@testing-library/react';
import GastoFormModal from '../Components/GastoFormModal';

const mockProps = {
  onSubmit: jest.fn(),
  onClose: jest.fn(),
  ots: [],
  clientes: [
    {
      id_cliente: 1,
      nombre_razon_social: 'Empresa uno S.A.',
    },
  ],
  open: true,
  editing: false,
  setEditing: jest.fn(),
  setEditId: jest.fn(),
};

test('renders GastoForm and checks inputs', () => {
  render(<GastoFormModal {...mockProps} />);
  
  expect(screen.getByLabelText(/Seleccionar N° OT/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Nombre del Gasto/i)).toBeInTheDocument(); 
  expect(screen.getByLabelText(/Detalle/i)).toBeInTheDocument();
});

test('submits the form and calls onSubmit prop', async () => {
  render(<GastoFormModal {...mockProps} />);

  fireEvent.change(screen.getByLabelText(/Nombre del Gasto/i), { target: { value: 'Test gasto' } });
  fireEvent.change(screen.getByLabelText(/Detalle/i), { target: { value: 'Detalle test' } });
  fireEvent.change(screen.getByLabelText(/Fecha de Compra/i), { target: { value: '2023-01-01' } });
  fireEvent.change(screen.getByLabelText(/Método de pago/i), { target: { value: 'Efectivo' } });
  fireEvent.change(screen.getByLabelText(/Número de Factura/i), { target: { value: '12345' } });
  fireEvent.change(screen.getByLabelText(/Pago Neto/i), { target: { value: '10000' } });
  fireEvent.change(screen.getByLabelText(/Proveedor/i), { target: { value: 'Proveedor X' } });

  // ✅ Seleccionar cliente visible como 'Empresa uno S.A.'
  fireEvent.mouseDown(screen.getByLabelText(/Cliente/i));
  const listbox = await screen.findByRole('listbox');
  fireEvent.click(within(listbox).getByText(/Empresa uno S\.A\./i)); // escapamos el punto

  fireEvent.change(screen.getByLabelText(/Observación/i), { target: { value: 'Observación test' } });

  const form = screen.getByRole('form', { name: /form-gasto/i });
  fireEvent.submit(form);

  expect(mockProps.onSubmit).toHaveBeenCalled();
});

test('input change updates value', () => {
  render(<GastoFormModal {...mockProps} />);

  const itemGastoInput = screen.getByLabelText(/Nombre del Gasto/i);  
  fireEvent.change(itemGastoInput, { target: { value: 'Test gasto' } });
  
  expect(itemGastoInput.value).toBe('Test gasto');
});
