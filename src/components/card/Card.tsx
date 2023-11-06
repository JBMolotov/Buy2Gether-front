import React, { ReactNode } from "react";
import { CardContainer } from "./styles";

type CardProps = {
  children: ReactNode;
};

const Card: React.FC<CardProps> = ({ children }) => {
  return <CardContainer>{children}</CardContainer>;
};

export default Card;
