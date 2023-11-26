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

const clientData: Client = {
  id: 1,
  cpf: "123.456.789-10",
  name: "Paulo Teste",
  email: "paulo.teste@gmail.com",
  address: "USP, São Carlos",
  phoneNumber: "(16) 98765-4321",
};

const ClientProfile: React.FC = () => {
  const client = clientData;

  return (
    <>
      <Header />
      <Container>
        <Card>
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
        </Card>
      </Container>
    </>
  );
};

export default ClientProfile;
