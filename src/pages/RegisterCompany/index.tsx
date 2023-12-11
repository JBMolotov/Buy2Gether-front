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
import { isEmailValid, isCNPJValid } from "../validation";
import Modal from "../../components/modal";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf_cnpj, setCpf_cnpj] = useState("");
  const [ramo, setRamo] = useState("");
  const [address, setAddress] = useState("");

  const [emailError, setEmailError] = useState("");
  const [cnpjError, setCnpjError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  const handleRegister = async () => {
    if (!username || !email || !password || !cpf_cnpj || !ramo || ramo === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (!isEmailValid(email)) {
      setEmailError("Email inválido");
      return;
    } else {
      setEmailError("");
    }

    if (!isCNPJValid(cpf_cnpj)) {
      setCnpjError("CNPJ inválido");
      return;
    } else {
      setCnpjError("");
    }

    const requestData = {
      cpfCnpj: cpf_cnpj,
      name: username,
      email: email,
      password: password,
      address: address,
      fieldOfActivity: ramo,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/companies/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response) {
        try {
          const responseData = await response.json();
          openModal();
        } catch (parseError) {
          console.error("Error parsing response:", parseError);
          alert(
            "Registration succeeded, but there was an error processing the response."
          );
        }
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (networkError) {
      console.error("Network error:", networkError);
      alert("Network error. Please try again.");
    }
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
            </div>
            <div>
              <label>CNPJ:</label>
              <TextField
                type="text"
                value={cpf_cnpj}
                onChange={(e) => setCpf_cnpj(e.target.value)}
              />
              <ErrorMsg>{cnpjError}</ErrorMsg>
            </div>
            <div>
              <label>Endereço:</label>
              <TextField
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
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
