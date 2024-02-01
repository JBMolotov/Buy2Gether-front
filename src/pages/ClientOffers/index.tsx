import React, { useEffect } from "react";
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
import axios from "axios";

//Fix for "matchMedia not present, legacy browsers require a polyfill jest" error
// window.matchMedia =
//   window.matchMedia ||
//   function () {
//     return {
//       matches: false,
//       addListener: function () {},
//       removeListener: function () {},
//     };
//   };

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

// Get offers from API with type offers
export const getOffers = async (): Promise<Offer[]> => {
  // id from local storage
  const clientId = JSON.parse(localStorage.getItem("user") || "{}").id;
  try {
    const response = await axios.get(
      "http://localhost:3000/clients/offersJoined/" + clientId
    );
    const offers = response.data[0].offers;
    // console.log(response.data[0]);
    return offers;
  } catch (error) {
    console.error("Erro ao buscar ofertas:", error);
    return [];
  }
};

export const OfferCardComponent: React.FC<{ offer: Offer }> = ({ offer }) => {
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
  const [offers, setOffers] = React.useState<Offer[]>([]);

  useEffect(() => {
    const fetchOffers = async () => {
      const offers = await getOffers();
      setOffers(offers);
    };
    fetchOffers();
  }, []);

  const slideToShow = offers.length < 3 ? offers.length : 3;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slideToShow,
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
      <SectionTitle>Ofertas</SectionTitle>
      {offers && offers.length === 0 && (
        <p>Não há ofertas disponíveis no momento.</p>
      )}
      <SliderContainer>
        <Slider {...settings}>
          {offers &&
            offers.map((offer) => (
              <OfferCardComponent key={offer.id} offer={offer} />
            ))}
        </Slider>
      </SliderContainer>
    </>
  );
};

export default ClientOffers;
