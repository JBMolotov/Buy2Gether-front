/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import { render, screen } from "@testing-library/react";
import ClientProfile from "./index";
import { MemoryRouter } from "react-router-dom";

describe("ClientProfile component", () => {
  const mockClientData = {
    id: 1,
    cpf: "123.456.789-01",
    name: "Test Client",
    email: "test@example.com",
    address: "123 Test Street",
    phoneNumber: "123-456-7890",
  };

  beforeEach(() => {
    // Mocking the localStorage.getItem method to simulate client data
    jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      return JSON.stringify(mockClientData);
    });

    render(
      <MemoryRouter>
        <ClientProfile />
      </MemoryRouter>
    );
  });

  it("renders client profile with correct data", async () => {
    // Ensure that the profile information is rendered correctly
    expect(await screen.findByText("Test Client")).toBeInTheDocument();
    expect(screen.getByText("123.456.789-01")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("test@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("123 Test Street")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("123-456-7890")).toBeInTheDocument();
  });
});
