import React, { useState } from "react";
import { Title, MainContainer, LoginContainer, Form } from "./styles";
import TextField from "../../components/textfield";
import Button from "../../components/button";
import ShapeLogo from "../../components/shapeLogo";
import { isEmailValid, isCPFValid } from "../validation"; // Importe as funções de validação
import axios from "axios";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleLogin = async () => {
    if (!isValid) {
      alert("Email ou CPF inválido");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/clients/search",
        {
          email: username,
          password: password,
        }
      );

      const userData = response.data; // Armazene os dados do usuário

      // Verifique se há dados de usuário válidos
      if (userData) {
        // Armazene as informações do usuário no localStorage
        localStorage.setItem("user", JSON.stringify(userData));

        // Redirecionar para a página inicial após o login bem-sucedido
        window.location.href = "/clientprofile";
      } else {
        alert("Credenciais inválidas. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login. Tente novamente.");
    }
  };

  const validateEmailOrCPF = (input: string) => {
    if (isEmailValid(input) || isCPFValid(input)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  return (
    <MainContainer>
      <ShapeLogo />
      <LoginContainer>
        <Title>Buy 2 Gether</Title>
        <h2>Login</h2>
        <Form>
          <div>
            <label>Email ou CPF:</label>
            <TextField
              ariaLabel="Email ou CPF"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                validateEmailOrCPF(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Senha:</label>
            <TextField
              ariaLabel="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <div className="checkbox">
            <input type="checkbox" />
            <label>Lembrar-me</label>
          </div> */}

          <Button text="Entrar" onClick={handleLogin} />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: " 35rem",
              justifyContent: "space-between",
            }}
          >
            <Button
              text="Cadastre-se como cliente"
              onClick={() => {
                window.location.href = "/register";
              }}
            />

            <Button
              text="Cadastre-se como empresa"
              onClick={() => {
                window.location.href = "/registerCompany";
              }}
            />
          </div>

          {/* Forget the password section */}
          <div className="forget-password">
            <a href="#">Esqueceu a senha?</a>
          </div>
        </Form>
      </LoginContainer>
    </MainContainer>
  );
};

export default Login;
