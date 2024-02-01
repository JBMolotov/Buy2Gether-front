/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import Register from "./index";

// Mock axios.post to simulate successful registration
jest.mock("axios");

describe("Register component", () => {
  beforeEach(() => {
    render(<Register />);
  });

  it("renders all input fields", () => {
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByLabelText("CPF")).toBeInTheDocument();
  });

  it("requires all fields to be filled for registration", async () => {
    // Mockando a função alert
    jest.spyOn(window, "alert").mockImplementation(() => {});

    // Simulando um clique no botão de registro sem preencher nenhum campo
    fireEvent.click(screen.getByText("Registrar"));

    // Verificando se a função alert foi chamada com a mensagem esperada
    expect(window.alert).toHaveBeenCalledWith(
      "Por favor, preencha todos os campos."
    );
  });

  it("validates email input", async () => {
    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "invalid_email" } });
    fireEvent.click(screen.getByText("Registrar"));
    await waitFor(() =>
      expect(alert).toHaveBeenCalledWith("Por favor, preencha todos os campos.")
    );
  });

  it("validates CPF input", async () => {
    const cpfInput = screen.getByLabelText("CPF");
    fireEvent.change(cpfInput, { target: { value: "12345678900" } });
    fireEvent.click(screen.getByText("Registrar"));
    await waitFor(() =>
      expect(alert).toHaveBeenCalledWith("Por favor, preencha todos os campos.")
    );
  });

  it("validates password input", async () => {
    const passwordInput = screen.getByLabelText("Senha");
    fireEvent.change(passwordInput, { target: { value: "weakpass" } });
    fireEvent.click(screen.getByText("Registrar"));
    await waitFor(() =>
      expect(alert).toHaveBeenCalledWith("Por favor, preencha todos os campos.")
    );
  });

  it("successfully registers with valid inputs", async () => {
    // Mockando a função post do axios para simular uma resposta bem-sucedida
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue({
      data: {},
    });

    const nameInput = screen.getByLabelText("Nome");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Senha");
    const cpfInput = screen.getByLabelText("CPF");

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "StrongPass1!" } });
    fireEvent.change(cpfInput, { target: { value: "062.937.660-32" } });

    fireEvent.click(screen.getByText("Registrar"));

    // Aguarde a execução da função assíncrona
    await waitFor(() => {
      // Verifique se o alerta foi chamado com a mensagem esperada
      expect(alert).toHaveBeenCalledWith("Registro bem-sucedido!");

      // Verifique se axios.post foi chamado corretamente
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3000/clients/create",
        {
          name: "Test User",
          email: "test@example.com",
          password: "StrongPass1!",
          cpf: "062.937.660-32",
          phoneNumber: expect.any(Number),
          address: "Rua teste, 123",
        }
      );
    });
  });
});
