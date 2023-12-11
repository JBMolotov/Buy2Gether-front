import React, { useState, useEffect } from "react";
import {
  OfferCard,
  PriceTag,
  Description,
  SectionTitle,
  SliderContainer,
  ViewMoreButton,
} from "./styles";
import Header from "../../components/header/Header";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

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

const OfferCardComponent: React.FC<{ offer: Offer }> = ({ offer }) => {
  const navigate = useNavigate();
  const handleViewMore = () => {
    navigate(`/offer/${offer.id}`);
  };
  return (
    <OfferCard>
      {/* <img src="/path/to/offer-image.jpg" alt={offer.name} />{" "} */}
      <h3>{offer.name}</h3>
      <Description>{offer.description}</Description>
      <ViewMoreButton onClick={handleViewMore}>Ver Mais</ViewMoreButton>
      <PriceTag>{`R$ ${offer.price}`}</PriceTag>
    </OfferCard>
  );
};

// OffersView component
const MainPage: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/offers/searchAll`)
      .then((response) => response.json())
      .then((data) => {
        setOffers(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
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

export default MainPage;
