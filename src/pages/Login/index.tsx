import React, { useState } from "react";
import {
  Title,
  MainContainer,
  Shape,
  LoginContainer,
  Form,
  Button,
} from "./styles";
import TextField from "../../components/textfield";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Lógica de autenticação aqui
    if (username === "user" && password === "password") {
      alert("Login bem-sucedido! Redirecionando para a página de perfil.");
      // Substitua o redirecionamento com a lógica de roteamento apropriada
    } else {
      alert("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <MainContainer>
      <Shape />
      <LoginContainer>
        <Title>Buy 2 Gather</Title>
        <h2>Login</h2>
        <Form>
          <div>
            <label>Nome de usuário:</label>
            <TextField
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Senha:</label>
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="button" onClick={handleLogin}>
            Entrar
          </Button>
        </Form>
      </LoginContainer>
    </MainContainer>
  );
};

export default Login;
