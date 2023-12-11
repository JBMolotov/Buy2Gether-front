import React, { useState } from "react";
import TextField from "../../components/textfield";
import Button from "../../components/button";
import ShapeLogo from "../../components/shapeLogo";
import {
  MainContainer,
  Title,
  RegisterContainer,
  Form,
  ErrorMsg,
} from "./styles";
import { isEmailValid, isCPFValid } from "../validation";

const RegisterClient: React.FC = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setcpf] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [emailError, setEmailError] = useState("");
  const [cpfError, setCpfError] = useState("");

  const handleRegister = async () => {
    // Verificar se todos os campos estão preenchidos
    if (!name || !email || !password || !cpf || !phoneNumber || !address) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Validar o email e CPF
    if (!isEmailValid(email)) {
      setEmailError("Email inválido");
      return; // Retorna se o email for inválido
    } else {
      setEmailError("");
    }

    if (!isCPFValid(cpf)) {
      setCpfError("CPF inválido");
      return; // Retorna se o CPF for inválido
    } else {
      setCpfError("");
    }
    const requestData = {
      name,
      email,
      password,
      cpf,
      phoneNumber,
      address,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/clients/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
      if (response) {
        const responseData = await response.json();
        console.log(responseData);
        alert("Registration succeeded.");
        window.location.href = "/login";
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (networkError) {
      console.error("Network error:", networkError);
      alert("Network error. Please try again.");
    }
  };

  return (
    <MainContainer>
      <ShapeLogo />
      <RegisterContainer>
        <Title>Buy 2 Gether</Title>
        <h2>Registro</h2>
        <Form>
          <div>
            <label>Nome:</label>
            <TextField
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <TextField
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <ErrorMsg>{emailError}</ErrorMsg>
          </div>
          <div>
            <label>Senha:</label>
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>CPF:</label>
            <TextField
              type="text"
              value={cpf}
              onChange={(e) => setcpf(e.target.value)}
            />
            <ErrorMsg>{cpfError}</ErrorMsg>
          </div>
          <div>
            <label>Telefone:</label>
            <TextField
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <ErrorMsg>{cpfError}</ErrorMsg>
          </div>
          <div>
            <label>Endereço:</label>
            <TextField
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <ErrorMsg>{cpfError}</ErrorMsg>
          </div>
          <Button text="Registrar" onClick={handleRegister} />
          <Button
            text="Já tem uma conta? Faça login"
            onClick={() => {
              window.location.href = "/login";
            }}
          />
        </Form>
      </RegisterContainer>
    </MainContainer>
  );
};

export default RegisterClient;
