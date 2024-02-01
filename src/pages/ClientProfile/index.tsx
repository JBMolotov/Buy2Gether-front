import React, { useState } from "react";
import Header from "../../components/header/Header";
import Button from "../../components/button";
import axios from "axios";
import {
  Card,
  ProfileHeader,
  ProfileName,
  ProfileDetails,
  DetailItem,
  Container,
  TextField,
} from "./styles";

type Client = {
  id: number;
  cpf: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
};

// Get Client data from LocalStorage
const getClientData = async (): Promise<Client> => {
  const clientData = await JSON.parse(localStorage.getItem("user") || "{}");
  return clientData;
};

const isEmpty = (obj: Client) => {
  return Object.keys(obj).length === 0;
};

const ClientProfile: React.FC = () => {
  const [client, setClient] = React.useState<Client>({} as Client);

  const [userData, setUserData] = useState({
    cpf: "",
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (user) => {
    try {
      await axios.put("http://localhost:3000/clients/update", user); // Substitua '/api/user' pela sua rota real
      // Adicione lógica adicional após a atualização, se necessário
      alert("Dados do usuário atualizados com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:3000/clients/delete/" + client.id); // Substitua '/api/user' pela sua rota real
      // Adicione lógica adicional após a exclusão, se necessário
      localStorage.clear();
      alert("Usuário excluído com sucesso");
    } catch (error) {
      console.error("Erro ao excluir usuário", error);
    }
  };

  React.useEffect(() => {
    getClientData().then((data) => {
      setClient(data);
    });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Card>
          {!isEmpty(client) ? (
            <>
              <ProfileHeader>
                <ProfileName>{client.name}</ProfileName>
              </ProfileHeader>
              <ProfileDetails>
                <DetailItem>
                  <strong>CPF: </strong>
                  {client.cpf}
                </DetailItem>
                <br></br>
                <DetailItem>
                  <strong>Nome:</strong>
                  <TextField
                    name="name"
                    placeholder={client.name}
                    onChange={handleChange}
                    value={userData.name}
                  />
                </DetailItem>
                <DetailItem>
                  <strong>Email:</strong>
                  <TextField
                    name="email"
                    placeholder={client.email}
                    onChange={handleChange}
                    value={userData.email}
                  />
                </DetailItem>
                <DetailItem>
                  <strong>Endereço:</strong>
                  <TextField
                    name="address"
                    placeholder={client.address}
                    onChange={handleChange}
                    value={userData.address}
                  />
                </DetailItem>
                <DetailItem>
                  <strong>Celular:</strong>
                  <TextField
                    name="phoneNumber"
                    placeholder={client.phoneNumber}
                    onChange={handleChange}
                    value={userData.phoneNumber}
                  />
                </DetailItem>
              </ProfileDetails>
              <DetailItem>
                <Button
                  onClick={() => {
                    handleUpdate({
                      name: userData.name,
                      email: userData.email,
                      address: userData.address,
                      phoneNumber: userData.phoneNumber,
                    });
                  }}
                  text="Atualizar informações"
                />
                <Button
                  onClick={() => {
                    handleDelete();
                  }}
                  text="Deletar usuário"
                />
              </DetailItem>
            </>
          ) : (
            <>
              <ProfileHeader>
                <ProfileName>Usuário não encontrado</ProfileName>
              </ProfileHeader>
              <ProfileDetails>
                <p>
                  Por favor, faça o login para acessar o seu perfil. Caso ainda
                  não tenha uma conta, faça o seu cadastro.
                </p>

                <a href="/login">Fazer login</a>
              </ProfileDetails>
            </>
          )}
        </Card>
      </Container>
    </>
  );
};

export default ClientProfile;
