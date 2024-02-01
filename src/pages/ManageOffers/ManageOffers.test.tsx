/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ManageOffers from "./index";

describe("ManageOffers component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ManageOffers />
      </MemoryRouter>
    );
  });

  it("renders the main elements", () => {
    expect(screen.getByText("Gerenciamento de Ofertas")).toBeInTheDocument();
    expect(screen.getByText("Lista de Ofertas")).toBeInTheDocument();
    // To be more than one in the document
    expect(screen.getAllByText("Adicionar Oferta").length).toBeGreaterThan(0);
    expect(screen.getByLabelText("Oferta")).toBeInTheDocument();
    expect(screen.getByLabelText("Desconto (%)")).toBeInTheDocument();
    expect(screen.getByLabelText("Quantidade Mínima")).toBeInTheDocument();
    expect(screen.getByLabelText("Data de Validade")).toBeInTheDocument();
  });

  it("adds a new offer", async () => {
    fireEvent.change(screen.getByLabelText("Oferta"), {
      target: { value: "Test Offer" },
    });
    fireEvent.change(screen.getByLabelText("Desconto (%)"), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText("Quantidade Mínima"), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByLabelText("Data de Validade"), {
      target: { value: "2023-01-15" },
    });

    fireEvent.click(screen.getAllByText("Adicionar Oferta")[1]);

    await waitFor(() => {
      expect(screen.getByText("Test Offer")).toBeInTheDocument();
      expect(screen.getByText("10")).toBeInTheDocument();
      expect(screen.getByText("5")).toBeInTheDocument();
      expect(screen.getByText("2023-01-15")).toBeInTheDocument();
    });
  });

  it("edits an existing offer", async () => {
    fireEvent.change(screen.getByLabelText("Oferta"), {
      target: { value: "Test Offer" },
    });
    fireEvent.change(screen.getByLabelText("Desconto (%)"), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText("Quantidade Mínima"), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByLabelText("Data de Validade"), {
      target: { value: "2023-01-15" },
    });

    fireEvent.click(screen.getAllByText("Adicionar Oferta")[1]);

    fireEvent.click(screen.getByText("Editar"));

    fireEvent.change(screen.getByLabelText("Oferta"), {
      target: { value: "Updated Offer" },
    });
    fireEvent.change(screen.getByLabelText("Desconto (%)"), {
      target: { value: "20" },
    });
    fireEvent.change(screen.getByLabelText("Quantidade Mínima"), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText("Data de Validade"), {
      target: { value: "2023-01-20" },
    });

    fireEvent.click(screen.getByText("Salvar"));

    await waitFor(() => {
      expect(screen.getByText("Updated Offer")).toBeInTheDocument();
      expect(screen.getByText("20")).toBeInTheDocument();
      expect(screen.getByText("10")).toBeInTheDocument();
      expect(screen.getByText("2023-01-20")).toBeInTheDocument();
    });
  });

  it("deletes an existing offer", async () => {
    fireEvent.change(screen.getByLabelText("Oferta"), {
      target: { value: "Test Offer" },
    });
    fireEvent.change(screen.getByLabelText("Desconto (%)"), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText("Quantidade Mínima"), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByLabelText("Data de Validade"), {
      target: { value: "2023-01-15" },
    });

    fireEvent.click(screen.getAllByText("Adicionar Oferta")[1]);

    fireEvent.click(screen.getByText("Excluir"));

    await waitFor(() => {
      expect(screen.queryByText("Test Offer")).not.toBeInTheDocument();
    });
  });
});
