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

type Company = {
  id: number;
  cpfCnpj: string;
  name: string;
  email: string;
  address: string;
  fieldOfActivity: string;
};

const companyData: Company = {
  id: 1,
  cpfCnpj: "00.000.000/0001-00",
  name: "Tech Innovations Inc.",
  email: "contact@techinnovations.com",
  address: "123 Innovation Drive, Tech City",
  fieldOfActivity: "Software Development",
};

export const CompanyProfile: React.FC = () => {
  const company = companyData;

  return (
    <>
      <Header />
      <Container>
        <Card>
          <ProfileHeader>
            <ProfileName>{company.name}</ProfileName>
          </ProfileHeader>
          <ProfileDetails>
            <DetailItem>
              <strong>CNPJ:</strong> {company.cpfCnpj}
            </DetailItem>
            <DetailItem>
              <strong>Email:</strong> {company.email}
            </DetailItem>
            <DetailItem>
              <strong>Endereço:</strong> {company.address}
            </DetailItem>
            <DetailItem>
              <strong>Ramo de Atividade:</strong> {company.fieldOfActivity}
            </DetailItem>
          </ProfileDetails>
        </Card>
      </Container>
    </>
  );
};

export default CompanyProfile;
