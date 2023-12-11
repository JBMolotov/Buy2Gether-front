import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  OfferContainer,
  OfferTable,
  OfferTableCell,
  OfferTableHeader,
  OfferTableRow,
  ViewMoreButton,
  UnparticipateButton,
} from "./styles";
import Header from "../../components/header/Header";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";

type Client = {
  id: number;
  cpf: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  offers?: Offer[];
};

type Offer = {
  id: number;
  name: string;
  createdOn: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  price: number;
  discount: number;
  description: string;
  minimalForFreeDelivery: number | null;
  minimalForConsolidation: number | null;
  totalAmount: number;
  isPublic: boolean;
  version: number;
  clients?: Client[];
  companyId: number;
  isDeleted: boolean;
};

const ClientOffers: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const userId = localStorage.getItem("userToken") || "0";
  const navigate = useNavigate();

  const handleUnparticipateClick = async (offerId: number) => {
    if (userId === "0") {
      alert("You must be logged in to unparticipate in offers");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/offers/join/${offerId}/${userId}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.text();
      console.log(result);
      await fetchOffers();
    } catch (error) {
      console.error("Error unparticipating in offer: ", error);
    }
  };

  const fetchOffers = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/clients/offersJoined/${userId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const clients = await response.json();
      const offersFromClients = clients.flatMap(
        (client: Client) => client.offers || []
      );
      setOffers(offersFromClients);
    } catch (error) {
      console.error("Error fetching offers: ", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleViewMore = (offerId: number) => {
    navigate(`/offer/${offerId}`);
  };

  const isOfferExpired = (offerEndsAt: Date) => {
    return new Date(offerEndsAt) < new Date();
  };

  return (
    <>
      <Header />
      <h1>Minhas Ofertas</h1>
      <Container>
        <OfferContainer>
          <OfferTable>
            <thead>
              <OfferTableRow>
                <OfferTableHeader>Oferta</OfferTableHeader>
                <OfferTableHeader>Nome da Empresa</OfferTableHeader>
                <OfferTableHeader>Preço (R$)</OfferTableHeader>
                {/* <OfferTableHeader>Desconto (%)</OfferTableHeader> */}
                <OfferTableHeader>Quantidade Mínima</OfferTableHeader>
                {/* <OfferTableHeader>Data de Validade</OfferTableHeader> */}
                <OfferTableHeader>Última Atualização</OfferTableHeader>
                <OfferTableHeader>
                  Total de Ofertas Disponíveis
                </OfferTableHeader>
                <OfferTableHeader>Descrição</OfferTableHeader>
                <OfferTableHeader>Mínimo p/ Entrega Grátis</OfferTableHeader>
                <OfferTableHeader>Ações</OfferTableHeader>
              </OfferTableRow>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <OfferTableRow key={offer.id}>
                  <OfferTableCell>{offer.name}</OfferTableCell>
                  <OfferTableCell>{offer.companyId}</OfferTableCell>
                  <OfferTableCell>{offer.price}</OfferTableCell>
                  {/* <OfferTableCell>{offer.discount}</OfferTableCell> */}
                  <OfferTableCell>
                    {offer.minimalForConsolidation} participantes
                  </OfferTableCell>
                  <OfferTableCell>
                    {offer.updatedAt
                      ? offer.updatedAt.toLocaleDateString()
                      : "N/A"}
                  </OfferTableCell>
                  <OfferTableCell>{offer.totalAmount} ofertas</OfferTableCell>
                  <OfferTableCell>{offer.description}</OfferTableCell>

                  <OfferTableCell>
                    {offer.minimalForFreeDelivery} participantes
                  </OfferTableCell>
                  <OfferTableCell
                    style={{
                      minWidth: "150px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <ViewMoreButton onClick={() => handleViewMore(offer.id)}>
                      Ver Mais
                    </ViewMoreButton>
                    {/* {!isOfferExpired(offer.endsAt) && ( */}
                    <UnparticipateButton
                      onClick={() => handleUnparticipateClick(offer.id)}
                    >
                      Desistir
                    </UnparticipateButton>
                    {/* ) 
                    }
                    */}
                  </OfferTableCell>
                </OfferTableRow>
              ))}
            </tbody>
          </OfferTable>
        </OfferContainer>
      </Container>
    </>
  );
};

export default ClientOffers;
