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
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf_cnpj, setCpf_cnpj] = useState("");

  const [emailError, setEmailError] = useState("");
  const [cpfError, setCpfError] = useState("");

  const navigate = useNavigate();

  const handleRegister = () => {
    // Verificar se todos os campos estão preenchidos
    if (!username || !email || !password || !cpf_cnpj) {
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

    if (!isCPFValid(cpf_cnpj)) {
      setCpfError("CPF inválido");
      return; // Retorna se o CPF for inválido
    } else {
      setCpfError("");
    }

    // Se chegou até aqui, todos os campos estão preenchidos e as validações passaram
    alert("Registro bem-sucedido!");

    // Registrar na API
    const data = {
      name: username,
      email,
      password,
      cpf: cpf_cnpj,
    };

    axios
      .post("http://localhost:3000/clients/create", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao registrar");
        return;
      });

    // Redirecionar para a página de login
    navigate("/login");
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
            <label>CPF:</label>
            <TextField
              type="text"
              value={cpf_cnpj}
              onChange={(e) => setCpf_cnpj(e.target.value)}
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

export default Register;
