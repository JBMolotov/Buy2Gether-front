//Create a textfield component

import * as React from "react";

import { TextField } from "./styles";

interface Props {
  ariaLabel?: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Textfield: React.FC<Props> = ({ ariaLabel, type, value, onChange }) => {
  return (
    <>
      <br></br>
      <TextField
        aria-label={ariaLabel}
        type={type}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default Textfield;
