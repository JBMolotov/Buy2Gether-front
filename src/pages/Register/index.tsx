import React, { useState } from "react";
import {
  MainContainer,
  Title,
  Shape,
  RegisterContainer,
  Form,
  Input,
  Button,
} from "./styles";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Lógica de registro aqui
    // Você pode enviar os dados para um servidor, validar, etc.

    alert("Registro bem-sucedido! Redirecionando para a página de perfil.");
    // Substitua o redirecionamento com a lógica de roteamento apropriada
  };

  return (
    <MainContainer>
      <Shape />
      <RegisterContainer>
        <Title>Buy 2 Gather</Title>
        <h2>Registro</h2>
        <Form>
          <div>
            <label>Nome de usuário:</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Senha:</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="button" onClick={handleRegister}>
            Registrar
          </Button>
        </Form>
      </RegisterContainer>
    </MainContainer>
  );
};

export default Register;
