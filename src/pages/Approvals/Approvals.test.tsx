import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Approvals from "./index";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");

describe("Approvals component", () => {
  const mockApprovals = [
    {
      id: 1,
      cpfCnpj: "123456789",
      fieldOfActivity: "Technology",
      name: "Company ABC",
      isApproved: false,
    },
    // Adicione mais objetos de aprovação conforme necessário
  ];

  beforeEach(() => {
    // Mockando axios.get para simular a busca de aprovações
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: mockApprovals,
    });
  });

  it("fetches approvals from the API and displays them", async () => {
    render(
      <MemoryRouter>
        <Approvals />
      </MemoryRouter>
    );

    // Aguardar a conclusão da chamada assíncrona antes de verificar as expectativas
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:3000/companies/searchAll"
      );

      // Verificar se os itens de aprovação foram renderizados corretamente
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText("Company ABC")).toBeInTheDocument();
    });
  });
});
