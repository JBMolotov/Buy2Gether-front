import styled from "styled-components";

export const Card = styled.div`
  position: relative;
  border: 1px solid #ccc;
  max-width: 300px;
  padding: 30px;
  padding-top: 25px; /* Extra space for the price tag */
  padding-bottom: 20px; /* Extra space for the participate button */
  margin: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  background: linear-gradient(145deg, #f8f8f8, #e6e6e6);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const Title = styled.h2`
  color: #333;
  font-size: calc(1em + 0.5vw); /* Responsive font size */
  text-shadow: 1px 1px 2px #ddd;
`;

export const Detail = styled.p`
  color: #666;
  margin: 8px 0;
  font-size: calc(0.8em + 0.3vw); /* Responsive font size */
`;

export const PriceTag = styled.span`
  background-color: #ff5722;
  color: #fff;
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  border-radius: 8px;
  font-weight: bold;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  font-size: calc(0.8em + 0.3vw); /* Responsive font size */
`;

export const ParticipateButton = styled.button`
  background-color: #45a049;
  color: white;
  padding: 8px 100px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: calc(0.8em + 0.3vw); /* Responsive font size */
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
  position: relative;
  &:hover {
    background-color: #4caf50;
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #45a049;
  }
`;

export const ReturnButton = styled.button`
  padding: 8px 16px;
  background-color: transparent; /* No background */
  color: #1a73e8; /* A pleasant blue color for text */
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  position: absolute;
  top: 10px;
  left: 10px;
  transition: all 0.2s ease-in-out;

  &:hover {
    text-decoration: underline; /* Underline on hover */
  }

  &:focus {
    outline: none;
    text-decoration: underline;
  }

  &:active {
    color: #0f5cad; /* Darker blue when clicked */
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Use full viewport height */
  width: 100vw; /* Use full viewport width */
  position: fixed; /* Use fixed position to cover the entire viewport */
  top: 0;
  left: 0;
`;
