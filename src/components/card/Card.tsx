import React, { ReactNode } from "react";
import {
  CardContainer,
  StyledTable,
  FullWidthButton,
  StatusApproved,
  StatusRejected,
  StatusPending,
} from "./styles";

type CardProps = {
  children: ReactNode;
};

const Card: React.FC<CardProps> = ({ children }) => {
  return <CardContainer>{children}</CardContainer>;
};

export default Card;
