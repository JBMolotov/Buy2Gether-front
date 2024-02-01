/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import ClientOffers, { getOffers, OfferCardComponent } from "./index";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");

describe("ClientOffers component", () => {
  const mockOffers = [
    {
      id: 1,
      name: "Offer 1",
      createdOn: new Date(),
      updatedAt: null,
      deletedAt: null,
      price: 20,
      description: "Offer 1 Description",
      minimalForFreeDelivery: null,
      minimalForConsolidation: null,
      totalAmount: 50,
      isPublic: true,
      version: 1,
      clients: [],
      companyId: 1,
      isDeleted: false,
    },
    // Add more mock offers as needed
  ];

  beforeEach(() => {
    // Mocking axios.get to simulate fetching offers
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: [{ offers: mockOffers }],
    });
  });

  it("renders the component with fetched offers", async () => {
    render(
      <MemoryRouter>
        <ClientOffers />
      </MemoryRouter>
    );

    // Wait for the offers to be loaded
    await waitFor(() => {
      expect(screen.getByText("Offer 1")).toBeInTheDocument();
      expect(screen.getByText("Offer 1 Description")).toBeInTheDocument();
      expect(screen.getByText("R$ 20")).toBeInTheDocument();
    });
  });

  it("fetches offers from the API", async () => {
    await getOffers(); // Calls the actual getOffers function, which internally calls axios.get

    // Ensure that axios.get is called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:3000/clients/offersJoined/undefined"
    );
  });

  it("renders the OfferCardComponent correctly", () => {
    render(<OfferCardComponent offer={mockOffers[0]} />);

    // Ensure that the OfferCardComponent renders offer details correctly
    expect(screen.getByText("Offer 1")).toBeInTheDocument();
    expect(screen.getByText("Offer 1 Description")).toBeInTheDocument();
    expect(screen.getByText("R$ 20")).toBeInTheDocument();
  });

  // Add more tests for different scenarios if needed
});
