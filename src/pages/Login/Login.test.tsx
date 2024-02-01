/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import Login from "./index";

jest.mock("axios");

describe("Login component", () => {
  beforeEach(() => {
    render(<Login />);
  });

  it("renders all input fields", () => {
    expect(screen.getByLabelText("Email ou CPF")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
  });

  it("requires valid email or CPF for login", async () => {
    // Mockando a função alert
    jest.spyOn(window, "alert").mockImplementation(() => {});

    // Simulando um clique no botão de login sem preencher nenhum campo
    fireEvent.click(screen.getByText("Entrar"));

    // Verificando se a função alert foi chamada com a mensagem esperada
    expect(window.alert).toHaveBeenCalledWith("Email ou CPF inválido");
  });

  it("successfully logs in with valid credentials", async () => {
    // Mockando a função post do axios para simular uma resposta bem-sucedida
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue({
      data: {},
    });

    const emailOrCPFInput = screen.getByLabelText("Email ou CPF");
    const passwordInput = screen.getByLabelText("Senha");

    fireEvent.change(emailOrCPFInput, {
      target: { value: "valid_email@email.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "StrongPassword1!" } });

    fireEvent.click(screen.getByText("Entrar"));

    // Aguarde a execução da função assíncrona
    await waitFor(() => {
      // Verifique se axios.post foi chamado corretamente
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3000/clients/search",
        {
          email: "valid_email@email.com",
          password: "StrongPassword1!",
        }
      );
    });
  });

  // Adicione mais testes conforme necessário, como validar o tratamento de erros.
});
