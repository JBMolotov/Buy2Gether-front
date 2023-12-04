import React, { useState } from "react";
import TextField from "../../components/textfield";
import Button from "../../components/button";
import ShapeLogo from "../../components/shapeLogo";
import successImage from "../../assets/images/success.png";
import {
  MainContainer,
  Title,
  RegisterContainer,
  Form,
  ErrorMsg,
} from "./styles";
import { isEmailValid, isCNPJValid, isPasswordValid } from "../validation";
import Modal from "../../components/modal";
import axios from "axios";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnpj_cnpj, setCnpj_cnpj] = useState("");
  const [ramo, setRamo] = useState("");

  const [emailError, setEmailError] = useState("");
  const [cnpjError, setCnpjError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.href = "/login";
  };

  const maskCnpj = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const handleRegister = () => {
    // Verificar se todos os campos estão preenchidos
    if (
      !username ||
      !email ||
      !password ||
      !cnpj_cnpj ||
      !ramo ||
      ramo === ""
    ) {
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

    if (!isPasswordValid(password)) {
      setPasswordError("Senha inválida");
      return; // Retorna se a senha for inválida
    } else {
      setPasswordError("");
    }

    // Se chegou até aqui, todos os campos estão preenchidos e as validações passaram

    // Registrar na API
    const data = {
      name: username,
      email,
      password,
      cpfCnpj: cnpj_cnpj,
      fieldOfActivity: ramo,
      address: "Rua teste",
    };

    axios
      .post("http://localhost:3000/companies/create", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data);
        alert("Erro no registro. Verifique os dados e tente novamente.");
        return;
      });

    openModal();
  };

  return (
    <>
      <Modal open={isModalOpen} onClose={closeModal}>
        <h1>Parabéns!</h1>
        <p>
          Seu registro foi bem-sucedido! Agora, basta aguardar a aprovação da
          plataforma. Isso pode levar alguns dias.
        </p>
        <img
          src={successImage}
          alt="Imagem do modal"
          style={{ width: "15rem", height: "15rem" }}
        />
      </Modal>

      <MainContainer>
        <ShapeLogo />
        <RegisterContainer>
          <Title>Buy 2 Gether</Title>
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
              <ErrorMsg>{passwordError}</ErrorMsg>
            </div>
            <div>
              <label>CNPJ:</label>
              <TextField
                type="text"
                value={maskCnpj(cnpj_cnpj)}
                onChange={(e) => setCnpj_cnpj(e.target.value)}
              />
              <ErrorMsg>{cnpjError}</ErrorMsg>
            </div>
            <div>
              <label>Ramo de atuação:</label>
              <br></br>
              <br></br>
              <select
                onChange={(e) => setRamo(e.target.value)}
                style={{
                  borderRadius: "0.5rem",
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  padding: "0.75rem",
                  fontSize: "1rem",
                }}
              >
                <option value="">Selecione uma opção</option>
                <option value="Alimentos">Alimentos</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Eletrônicos">Eletrônicos</option>
                <option value="Eletrodomésticos">Eletrodomésticos</option>
                <option value="Informática">Informática</option>
                <option value="Móveis">Móveis</option>
                <option value="Outros">Outros</option>
              </select>
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
    </>
  );
};

export default Register;
