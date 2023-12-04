import React from "react";
import Header from "../../components/header/Header";
import {
  Card,
  ProfileHeader,
  ProfileName,
  ProfileDetails,
  DetailItem,
  Container,
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
                  <strong>CPF:</strong> {client.cpf}
                </DetailItem>
                <DetailItem>
                  <strong>Email:</strong> {client.email}
                </DetailItem>
                <DetailItem>
                  <strong>Endereço:</strong> {client.address}
                </DetailItem>
                <DetailItem>
                  <strong>Celular:</strong> {client.phoneNumber}
                </DetailItem>
              </ProfileDetails>
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
