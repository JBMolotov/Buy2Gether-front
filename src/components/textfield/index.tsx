//Create a textfield component

import * as React from "react";

import { TextField } from "./styles";

interface Props {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Textfield: React.FC<Props> = ({ type, value, onChange }) => {
  return <TextField type={type} value={value} onChange={onChange} />;
};

export default Textfield;
