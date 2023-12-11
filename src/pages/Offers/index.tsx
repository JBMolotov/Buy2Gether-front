import React, { useState, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";

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

const OfferCard: React.FC = () => {
  const [offer, setOffer] = useState<Offer | null>(null);
  const { offerId } = useParams<{ offerId: string }>();
  let navigate = useNavigate();

  const fetchOffer = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/offers/clientsJoined/${offerId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setOffer(data[0]);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    if (offerId) {
      fetchOffer();
    }
  }, [offerId]);

  const isClient = localStorage.getItem("userType") === "client";
  const userToken = localStorage.getItem("userToken");
  const clientIsParticipating = offer?.clients?.some(
    (client) => client.id === parseInt(userToken || "0")
  );

  const handleParticipateClick = async () => {
    if (!userToken || !isClient) {
      alert("Only clients can participate in offers");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/offers/join/${offer?.id}/${userToken}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.text();
      console.log(result);

      fetchOffer();
    } catch (error) {
      console.error("Error participating in offer: ", error);
    }
  };

  const renderPriceWithDiscount = () => (
    <>
      R$ {offer?.price}{" "}
      <span style={{ color: "red" }}>
        {"("}
        {offer?.discount}% de desconto!{")"}
      </span>
    </>
  );

  if (!offer) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Container>
        <Card>
          <ReturnButton />
          <PriceTag>{`R$ ${offer?.price}`}</PriceTag>
          <Title>{offer?.name}</Title>
          <Detail>
            <strong>Empresa:</strong> {offer?.companyId}
          </Detail>
          <Detail>
            {offer?.discount > 0
              ? renderPriceWithDiscount()
              : `R$ ${offer?.price}`}
          </Detail>
          <Detail>
            <strong>Descrição:</strong> {offer?.description}
          </Detail>
          <Detail>
            <strong>Mínimo p/ Entrega Grátis: </strong>
            {offer?.minimalForFreeDelivery} participantes
          </Detail>
          <Detail>
            <strong>Pedidos Disponíveis: </strong> {offer?.totalAmount}
          </Detail>
          <Detail>
            <strong>{(offer?.clients ?? []).length} </strong>
            clientes participando desta oferta!
          </Detail>
          <Detail>
            <strong>Oferta Pública:</strong> {offer?.isPublic ? "Sim" : "Não"}
          </Detail>
          <br />
          <Detail>
            <>Criado em: </>{" "}
            {offer?.createdOn && new Date(offer.createdOn).toLocaleDateString()}
          </Detail>
          {offer?.updatedAt && (
            <Detail>
              <>Última atualização:</>{" "}
              {new Date(offer.updatedAt).toLocaleDateString()}
            </Detail>
          )}
          {isClient && (
            <ParticipateButton onClick={handleParticipateClick}>
              {clientIsParticipating ? "Participando" : "Participar"}
            </ParticipateButton>
          )}
        </Card>
      </Container>
    </>
  );
};

export default OfferCard;
