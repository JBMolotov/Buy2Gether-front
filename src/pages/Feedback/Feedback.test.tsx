// Feedback.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Feedback from "./index";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

// Mockando o módulo axios
jest.mock("axios");

// Mockando uma função que responde à chamada da API
const mockPost = jest.spyOn(axios, "post");

describe("Feedback component", () => {
  it("renders the main elements", async () => {
    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );

    // Aguarda até que os elementos sejam renderizados
    await waitFor(() => {
      // Verifica se elementos principais estão presentes na tela
      expect(screen.getByText("Inserir Feedback")).toBeInTheDocument();
      expect(
        screen.getByLabelText("Selecione uma empresa")
      ).toBeInTheDocument();
      expect(screen.getByLabelText("CaixaDeFeedback")).toBeInTheDocument();
    });
  });

  // Verifica se chama a lista de companias corretamente ao carregar a página
  it("fetches companies on page load", async () => {
    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );

    // Aguarda até que os elementos sejam renderizados
    await waitFor(() => {
      // Verifica se a função axios.get foi chamada corretamente
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:3000/companies/searchAll"
      );
    });
  });
});
