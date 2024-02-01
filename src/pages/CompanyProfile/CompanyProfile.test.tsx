/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import CompanyProfile from "./index";

// Mock axios.get to simulate successful retrieval of company data
jest.mock("axios");

describe("CompanyProfile component", () => {
  const mockCompanyData = {
    id: 1,
    cpfCnpj: "123.456.789/0001-23",
    name: "Test Company",
    email: "test@example.com",
    address: "123 Test Street",
    fieldOfActivity: "Technology",
  };

  beforeEach(() => {
    // Mock axios.get to resolve with mock company data

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: mockCompanyData,
    });

    render(
      <MemoryRouter>
        <CompanyProfile />
      </MemoryRouter>
    );
  });

  it("renders company profile with correct data", async () => {
    // Ensure that the profile information is rendered correctly
    expect(await screen.findByText("Test Company")).toBeInTheDocument();
    expect(screen.getByText("123.456.789/0001-23")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("test@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("123 Test Street")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Technology")).toBeInTheDocument();
  });
});
