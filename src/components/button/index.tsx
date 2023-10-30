//Create a button component

import * as React from "react";

import { Button as ButtonStyled } from "./styles";

interface Props {
  text: string;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ text, onClick }) => {
  return (
    <>
      <br></br>
      <ButtonStyled type="button" onClick={onClick}>
        {text}
      </ButtonStyled>
    </>
  );
};

export default Button;
