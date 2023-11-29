import React, { useState } from "react";
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
};

type OfferItem = {
  id: number;
  name: string;
  createdOn: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  endsAt: Date;
  price: number;
  discount: number;
  description: string;
  minimalForFreeDelivery: number | null;
  minimalForConsolidation: number | null;
  totalAmount: number;
  isPublic: boolean;
  version: number;
  clients: Client[];
  companyName: string;
  isDeleted: boolean;
};

export const offersData = [
  {
    id: 1,
    name: "Marmitas do Kallas",
    createdOn: new Date("2023-11-01T12:00:00Z"),
    updatedAt: new Date("2023-11-02T12:00:00Z"),
    endsAt: new Date("2023-12-02T12:00:00Z"),
    deletedAt: null,
    price: 19.99,
    discount: 20,
    description: "Pacote de 50 marmitas. Acompanhamentos: Arroz, Feijão, Carne",
    minimalForFreeDelivery: 10.0,
    minimalForConsolidation: 5,
    totalAmount: 50,
    isPublic: true,
    version: 1,
    clients: [],
    companyName: "Kallas Restaurante",
    isDeleted: false,
  },
  {
    id: 2,
    name: "Peixes do Centro",
    createdOn: new Date("2023-11-01T12:00:00Z"),
    updatedAt: new Date("2023-11-02T12:00:00Z"),
    endsAt: new Date("2023-12-01T18:00:00Z"),
    deletedAt: null,
    price: 19.99,
    discount: 20,
    description: "Pacote de 50 peixes à venda. Acompanhamentos: Limão.",
    minimalForFreeDelivery: 10.0,
    minimalForConsolidation: 8,
    totalAmount: 50,
    isPublic: true,
    version: 1,
    clients: [],
    companyName: "Peixes Restaurante",
    isDeleted: false,
  },
  {
    id: 3,
    name: "Teste de Oferta Vencida",
    createdOn: new Date("2023-11-01T12:00:00Z"),
    updatedAt: new Date("2023-11-02T12:00:00Z"),
    endsAt: new Date("2023-11-28T18:00:00Z"),
    deletedAt: null,
    price: 19.99,
    discount: 20,
    description: "Pacote de 50 peixes à venda. Acompanhamentos: Limão.",
    minimalForFreeDelivery: 10.0,
    minimalForConsolidation: 8,
    totalAmount: 50,
    isPublic: true,
    version: 1,
    clients: [],
    companyName: "Peixes Restaurante",
    isDeleted: false,
  },
];

const ClientOffers: React.FC = () => {
  const [offers, setOffers] = useState<OfferItem[]>(offersData);
  const [editOffer, setEditOffer] = useState<OfferItem | null>(null);
  const navigate = useNavigate();

  const handleDeleteOffer = (id: number) => {
    const updatedOffers = offers.filter((offer) => offer.id !== id);
    setOffers(updatedOffers);
    if (editOffer && editOffer.id === id) {
      setEditOffer(null);
    }
  };

  const handleViewMore = () => {
    navigate("/offer");
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
                <OfferTableHeader>Desconto (%)</OfferTableHeader>
                <OfferTableHeader>Quantidade Mínima</OfferTableHeader>
                <OfferTableHeader>Data de Validade</OfferTableHeader>
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
                  <OfferTableCell>{offer.companyName}</OfferTableCell>
                  <OfferTableCell>{offer.price}</OfferTableCell>
                  <OfferTableCell>{offer.discount}</OfferTableCell>
                  <OfferTableCell>
                    {offer.minimalForConsolidation} participantes
                  </OfferTableCell>
                  <OfferTableCell>
                    {isOfferExpired(offer.endsAt) ? (
                      <span style={{ color: "gray" }}>
                        Consolidada em:{" "}
                        {offer.endsAt.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                        , {offer.endsAt.toLocaleDateString()}
                      </span>
                    ) : (
                      <>
                        {offer.endsAt.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                        , {offer.endsAt.toLocaleDateString()}
                      </>
                    )}
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
                    <ViewMoreButton onClick={() => handleViewMore()}>
                      Ver Mais
                    </ViewMoreButton>
                    {!isOfferExpired(offer.endsAt) && (
                      <UnparticipateButton
                        onClick={() => handleDeleteOffer(offer.id)}
                      >
                        Desistir
                      </UnparticipateButton>
                    )}
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
