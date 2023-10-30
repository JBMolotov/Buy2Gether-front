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
import { isEmailValid, isCNPJValid } from "../validation";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnpj_cnpj, setCnpj_cnpj] = useState("");
  const [ramo, setRamo] = useState("");

  const [emailError, setEmailError] = useState("");
  const [cnpjError, setCnpjError] = useState("");

  const handleRegister = () => {
    // Verificar se todos os campos estão preenchidos
    if (!username || !email || !password || !cnpj_cnpj || !ramo) {
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

    if (!isCNPJValid(cnpj_cnpj)) {
      setCnpjError("CNPJ inválido");
      return; // Retorna se o Cnpj for inválido
    } else {
      setCnpjError("");
    }

    // Se chegou até aqui, todos os campos estão preenchidos e as validações passaram
    alert(
      "Registro bem-sucedido! Aguardando aprovação pela plataforma... Isso pode levar alguns dias."
    );
    window.location.href = "/login";
  };

  return (
    <MainContainer>
      <ShapeLogo />
      <RegisterContainer>
        <Title>Buy 2 Gather</Title>
        <h2>Registro Empresa</h2>
        <Form>
          <div>
            <label>Nome:</label>
            <TextField
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <label>CNPJ:</label>
            <TextField
              type="text"
              value={cnpj_cnpj}
              onChange={(e) => setCnpj_cnpj(e.target.value)}
            />
            <ErrorMsg>{cnpjError}</ErrorMsg>
          </div>
          <div>
            <label>Ramo de atuação:</label>
            <TextField
              type="text"
              value={ramo}
              onChange={(e) => setRamo(e.target.value)}
            />
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

export default Register;
