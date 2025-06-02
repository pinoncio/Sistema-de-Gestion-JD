import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "../pages/LoginPage";
import { BrowserRouter } from "react-router-dom";
import loginUser from "../Services/authService";

beforeAll(() => {
  Storage.prototype.setItem = jest.fn();
});

jest.mock("../Services/authService", () => jest.fn());

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza correctamente el formulario de login", () => {
    renderWithRouter(<LoginPage />);
    expect(screen.getByLabelText(/Rut de usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Iniciar sesión/i })
    ).toBeInTheDocument();
  });

  test("muestra error si el RUT es inválido", async () => {
    renderWithRouter(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/Rut de usuario/i), {
      target: { value: "12345678-9" },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: "Diego1201" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Iniciar sesión/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/El rut ingresado no es válido/i)
      ).toBeInTheDocument();
    });
  });

  test("muestra error si la contraseña es incorrecta", async () => {
    loginUser.mockRejectedValueOnce(new Error("Contraseña incorrecta"));
    renderWithRouter(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/Rut de usuario/i), {
      target: { value: "20.520.746-5" },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: "incorrecta" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Iniciar sesión/i }));

    await waitFor(() => {
      expect(screen.getByText(/Contraseña incorrecta/i)).toBeInTheDocument();
    });
  });

  test("muestra error si el usuario está desactivado", async () => {
    loginUser.mockRejectedValueOnce(new Error("Usuario desactivado"));
    renderWithRouter(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/Rut de usuario/i), {
      target: { value: "00.000.000-0" },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: "Diego1201" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Iniciar sesión/i }));

    await waitFor(() => {
      expect(screen.getByText(/Usuario desactivado/i)).toBeInTheDocument();
    });
  });

  test("envía correctamente los datos con RUT y contraseña válidos", async () => {
    const mockResponse = {
      token: "fake-token",
      id_usuario: 1,
      rol: 1,
      nombre_usuario: "Diego",
      apellido_usuario: "Tester",
    };
    loginUser.mockResolvedValueOnce(mockResponse);
    renderWithRouter(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/Rut de usuario/i), {
      target: { value: "20.520.746-5" },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: "Diego1201" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Iniciar sesión/i }));

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith("20.520.746-5", "Diego1201");
    });

    // Este puede ir fuera si no depende del `waitFor`
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
