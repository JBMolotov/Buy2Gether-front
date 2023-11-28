import React from "react";
import {
  OfferCard,
  PriceTag,
  Description,
  SectionTitle,
  SliderContainer,
  ParticipateButton,
  ViewMoreButton,
} from "./styles";
import Header from "../../components/header/Header";
import Slider from "react-slick";

type Offer = {
  id: number;
  name: string;
  createdOn: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  price: number;
  description: string;
  minimalForFreeDelivery: number | null;
  minimalForConsolidation: number | null;
  totalAmount: number;
  isPublic: boolean;
  version: number;
  clients: Client[]; // This would be an array of Client type objects
  companyId: number;
  isDeleted: boolean;
};

type Client = {
  id: number;
  cpf: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
};

const offers: Offer[] = [
  {
    id: 1,
    name: "Kallas Restaurante",
    createdOn: new Date("2021-09-01T12:00:00Z"),
    updatedAt: null,
    deletedAt: null,
    price: 19.99,
    description:
      "Pacote 30 marmitas. Acompanhamentos: Arroz, Feijão, Carne (Peixe ou frango)",
    minimalForFreeDelivery: 100.0,
    minimalForConsolidation: null,
    totalAmount: 50,
    isPublic: true,
    version: 1,
    clients: [],
    companyId: 123,
    isDeleted: false,
  },
  {
    id: 2,
    name: "Supermarket Deals",
    createdOn: new Date("2021-09-10T15:00:00Z"),
    updatedAt: null,
    deletedAt: null,
    price: 5.99,
    description: "Discounted groceries package",
    minimalForFreeDelivery: 50.0,
    minimalForConsolidation: null,
    totalAmount: 150,
    isPublic: true,
    version: 1,
    clients: [],
    companyId: 456,
    isDeleted: false,
  },
  {
    id: 3,
    name: "Gym Membership",
    createdOn: new Date("2021-09-15T09:30:00Z"),
    updatedAt: null,
    deletedAt: null,
    price: 29.99,
    description: "Monthly gym subscription with access to all facilities",
    minimalForFreeDelivery: null,
    minimalForConsolidation: null,
    totalAmount: 200,
    isPublic: true,
    version: 1,
    clients: [],
    companyId: 789,
    isDeleted: false,
  },
  {
    id: 4,
    name: "Teste Membership",
    createdOn: new Date("2021-09-15T09:30:00Z"),
    updatedAt: null,
    deletedAt: null,
    price: 29.99,
    description: "Monthly gym subscription with access to all facilities",
    minimalForFreeDelivery: null,
    minimalForConsolidation: null,
    totalAmount: 200,
    isPublic: true,
    version: 1,
    clients: [],
    companyId: 789,
    isDeleted: false,
  },
  {
    id: 5,
    name: "Movie Membership",
    createdOn: new Date("2021-09-15T09:30:00Z"),
    updatedAt: null,
    deletedAt: null,
    price: 29.99,
    description: "Monthly gym subscription with access to all facilities",
    minimalForFreeDelivery: null,
    minimalForConsolidation: null,
    totalAmount: 200,
    isPublic: true,
    version: 1,
    clients: [],
    companyId: 789,
    isDeleted: false,
  },
  {
    id: 6,
    name: "Pacote de Massagem",
    createdOn: new Date("2021-09-15T09:30:00Z"),
    updatedAt: null,
    deletedAt: null,
    price: 29.99,
    description: "Monthly gym subscription with access to all facilities",
    minimalForFreeDelivery: null,
    minimalForConsolidation: null,
    totalAmount: 200,
    isPublic: true,
    version: 1,
    clients: [],
    companyId: 789,
    isDeleted: false,
  },
];

const OfferCardComponent: React.FC<{ offer: Offer }> = ({ offer }) => {
  return (
    <OfferCard>
      {/* <img src="/path/to/offer-image.jpg" alt={offer.name} />{" "} */}
      <h3>{offer.name}</h3>
      <Description>{offer.description}</Description>
      <ParticipateButton>Participar</ParticipateButton>
      <ViewMoreButton>Ver Mais</ViewMoreButton>
      <PriceTag>{`R$ ${offer.price}`}</PriceTag>
    </OfferCard>
  );
};

// OffersView component
const ClientOffers: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Header />
      <SectionTitle>Principais ofertas</SectionTitle>
      <SliderContainer>
        <Slider {...settings}>
          {offers.map((offer) => (
            <OfferCardComponent key={offer.id} offer={offer} />
          ))}
        </Slider>
      </SliderContainer>

      <SectionTitle>Ofertas para você</SectionTitle>
      <SliderContainer>
        <Slider {...settings}>
          {offers.map((offer) => (
            <OfferCardComponent key={offer.id} offer={offer} />
          ))}
        </Slider>
      </SliderContainer>

      <SectionTitle>Ofertas populares no momento</SectionTitle>
      <SliderContainer>
        <Slider {...settings}>
          {offers.map((offer) => (
            <OfferCardComponent key={offer.id} offer={offer} />
          ))}
        </Slider>
      </SliderContainer>
    </>
  );
};

export default ClientOffers;
