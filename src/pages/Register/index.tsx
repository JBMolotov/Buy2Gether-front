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
import { isEmailValid, isCPFValid, isPasswordValid } from "../validation";
import axios from "axios";

const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf_cnpj, setCpf_cnpj] = useState("");

  const [emailError, setEmailError] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

    if (!isPasswordValid(password)) {
      setPasswordError(
        "A senha deve conter pelo menos 8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial"
      );
      return;
    } else {
      setPasswordError("");
    }

    // Se chegou até aqui, todos os campos estão preenchidos e as validações passaram
    alert("Registro bem-sucedido!");

    // Registrar na API
    const data = {
      name: username,
      email,
      password,
      cpf: cpf_cnpj,
      phoneNumber: Math.floor(Math.random() * 99999999999),
      address: "Rua teste, 123",
    };

    return axios
      .post("http://localhost:3000/clients/create", data)
      .then((response) => {
        // go to login page

        window.location.href = "/login";
      })
      .catch((error) => {
        alert("Erro ao registrar, tente novamente mais tarde.");
        return;
      });
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
              ariaLabel="Nome"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <TextField
              ariaLabel="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <ErrorMsg>{emailError}</ErrorMsg>
          </div>
          <div>
            <label>Senha:</label>
            <TextField
              ariaLabel="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ErrorMsg>{passwordError}</ErrorMsg>
          </div>
          <div>
            <label>CPF:</label>
            <TextField
              ariaLabel="CPF"
              type="text"
              value={maskCPF(cpf_cnpj)}
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
