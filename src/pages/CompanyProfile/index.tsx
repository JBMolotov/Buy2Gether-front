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
import axios from "axios";
import { url } from "inspector";

type Company = {
  id: number;
  cpfCnpj: string;
  name: string;
  email: string;
  address: string;
  fieldOfActivity: string;
};

// Get Company data from LocalStorage
const getCompanyData = async (): Promise<Company> => {
  try {
    const url = window.location.href;
    const id = url.split("?").pop();
    console.log(id);

    const response = await axios.get(
      "http://localhost:3000/companies/search/" + id
    );
    const company = response.data;
    return company;
  } catch (error) {
    console.error("Erro ao buscar companhia:", error);
    return {} as Company;
  }
  // const company = await axios.get("http://localhost:3000/companies/search/1");
  // return company.data;
};

const isEmpty = (obj: Company) => {
  return Object.keys(obj).length === 0;
};

export const CompanyProfile: React.FC = () => {
  const [company, setCompany] = React.useState<Company>({} as Company);

  React.useEffect(() => {
    getCompanyData().then((company) => {
      setCompany(company);
    });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Card>
          {!isEmpty(company) ? (
            <>
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
            </>
          ) : (
            <>
              <ProfileHeader>
                <ProfileName>Companhia não encontrada</ProfileName>
              </ProfileHeader>
              <ProfileDetails>
                <p>
                  Por favor, verifique se a companhia está cadastrada e ativa.
                </p>
              </ProfileDetails>
            </>
          )}
        </Card>
      </Container>
    </>
  );
};

export default CompanyProfile;
