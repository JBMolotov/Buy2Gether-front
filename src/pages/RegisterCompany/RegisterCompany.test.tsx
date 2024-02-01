/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import RegisterCompany from "./index";

jest.mock("axios");

describe("RegisterCompany component", () => {
  beforeEach(() => {
    render(<RegisterCompany />);
  });

  it("renders all input fields", () => {
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByLabelText("CNPJ")).toBeInTheDocument();
    expect(screen.getByLabelText("Ramo de atuação")).toBeInTheDocument();
  });

  it("requires all fields to be filled for registration", async () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});

    fireEvent.click(screen.getByText("Registrar"));

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

  it("validates CNPJ input", async () => {
    const cnpjInput = screen.getByLabelText("CNPJ");
    fireEvent.change(cnpjInput, { target: { value: "invalid_cnpj" } });
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
    jest.spyOn(window, "alert").mockImplementation(() => {});
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue({
      data: {},
    });

    const nameInput = screen.getByLabelText("Nome");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Senha");
    const cnpjInput = screen.getByLabelText("CNPJ");
    const branchInput = screen.getByLabelText("Ramo de atuação");

    fireEvent.change(nameInput, { target: { value: "Company Name" } });
    fireEvent.change(emailInput, { target: { value: "company@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "StrongPass1!" } });
    fireEvent.change(cnpjInput, { target: { value: "12.345.678/0001-90" } });
    fireEvent.change(branchInput, { target: { value: "Eletrônicos" } });

    fireEvent.click(screen.getByText("Registrar"));

    await waitFor(() => {
      // expect to a modal to be shown
      expect(screen.getByText("Parabéns!")).toBeInTheDocument();

      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3000/companies/create",
        {
          name: "Company Name",
          email: "company@example.com",
          password: "StrongPass1!",
          cpfCnpj: "12.345.678/0001-90",
          fieldOfActivity: "Eletrônicos",
          address: "Rua teste",
        }
      );
    });
  });
});
