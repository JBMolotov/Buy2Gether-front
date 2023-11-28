import styled from "styled-components";

export const OfferCardContainer = styled.div`
  margin: 20px;
`;

export const OfferCard = styled.div`
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 250px; // Fixed width for each card
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 250px;
  max-width: 250px;
  overflow: hidden;
  transition: transform 0.3s ease;

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  h3 {
    margin: 0;
    padding: 10px;
    background-color: #eceff1;
    color: #333;
    font-size: 1.1rem;
  }
`;

export const SliderContainer = styled.div`
  margin: 0 auto;
  justify-content: center; // Center children horizontally
  align-items: center; // Center children vertically (if needed)
  width: 60%; // Take the full width of the parent
`;

export const Description = styled.p`
  padding: 8px 10px 10px 10px;
  min-height: 65px;
  color: #757575;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
  border-bottom: 1px solid #eceff1;
`;

export const SectionContainer = styled.section`
  width: 60%;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  text-align: left;
  margin-top: 40px;
  margin-left: 15em;
`;

export const PriceTag = styled.span`
  background-color: #ff5722;
  color: #fff;
  float: right;
  padding: 5px 10px;
  bottom: 30px;
  border-radius: 0 0 0 8px;
  font-weight: bold;
`;

export const ParticipateButton = styled.button`
  background-color: #45a049;
  float: left;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 0 0 8px 0;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4caf50;
  }
`;

export const ViewMoreButton = styled.button`
  background-color: #1976d2; // A blue background color
  float: center;
  color: white;
  padding: 8px 9px;
  border: none;
  border-radius: 0 0 8px 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2196f3; // A darker blue color for the hover state
  }
`;
