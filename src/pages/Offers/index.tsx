import React from "react";
import {
  Card,
  Title,
  Detail,
  ParticipateButton,
  PriceTag,
  ReturnButton,
  Container,
} from "./styles";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";

type Client = {
  id: number;
  cpf: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
};

type Offer = {
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
  clients: Client[]; // This would be an array of Client type objects
  companyName: string;
  isDeleted: boolean;
};

export const offer = {
  id: 1,
  name: "Marmitas do Kallas",
  createdOn: new Date("2023-11-01T12:00:00Z"),
  updatedAt: new Date("2023-11-02T12:00:00Z"),
  endsAt: new Date("2023-11-02T12:00:00Z"),
  deletedAt: null,
  price: 19.99,
  discount: 20,
  description: "Pacote de 50 marmitas. Acompanhamentos: Arroz, Feijão, Carne",
  minimalForFreeDelivery: 10.0,
  minimalForConsolidation: null,
  totalAmount: 50,
  isPublic: true,
  version: 1,
  clients: [],
  companyName: "Kallas Restaurante",
  isDeleted: false,
};

type OfferCardProps = {
  offer: Offer;
};

const BackButton = () => {
  let navigate = useNavigate();

  return <ReturnButton onClick={() => navigate("/")}>Voltar</ReturnButton>;
};

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  const renderPriceWithDiscount = () => (
    <>
      R$ {offer.price}{" "}
      <span style={{ color: "red" }}>
        {"("}
        {offer.discount}% de desconto!{")"}
      </span>
    </>
  );

  return (
    <>
      <Header />
      <Container>
        <Card>
          <BackButton />
          <PriceTag>{`R$ ${offer.price}`}</PriceTag>
          <Title>{offer.name}</Title>
          <Detail>
            <strong>Empresa:</strong> {offer.companyName}
          </Detail>
          <Detail>
            {offer.discount > 0
              ? renderPriceWithDiscount()
              : `R$ ${offer.price}`}
          </Detail>
          <Detail>
            <strong>Descrição:</strong> {offer.description}
          </Detail>
          <Detail>
            <strong>Mínimo p/ Entrega Grátis: </strong>
            {offer.minimalForFreeDelivery} participantes
          </Detail>
          <Detail>
            <strong>Pedidos Disponíveis: </strong> {offer.totalAmount}
          </Detail>
          <Detail>
            <strong>{offer.clients.length} </strong>
            clientes participando desta oferta!
          </Detail>
          <Detail>
            <strong>Oferta termina em: </strong>
            {new Date(offer.endsAt).toLocaleDateString()}
          </Detail>
          <Detail>
            <strong>Oferta Pública:</strong> {offer.isPublic ? "Sim" : "Não"}
          </Detail>
          <br />
          <Detail>
            <>Criado em: </> {new Date(offer.createdOn).toLocaleDateString()}
          </Detail>
          {offer.updatedAt && (
            <Detail>
              <>Última atualização:</>{" "}
              {new Date(offer.updatedAt).toLocaleDateString()}
            </Detail>
          )}
          <ParticipateButton>Participar</ParticipateButton>
        </Card>
      </Container>
    </>
  );
};

export default OfferCard;
