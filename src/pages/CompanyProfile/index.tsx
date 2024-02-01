import React, { useState } from "react";
import Header from "../../components/header/Header";
import Button from "../../components/button";
import {
  Card,
  ProfileHeader,
  ProfileName,
  ProfileDetails,
  DetailItem,
  Container,
  TextField,
} from "./styles";
import axios from "axios";

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
    // console.log(id);

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

  const [companyData, setCompanyData] = useState({
    cnpj: "",
    name: "",
    email: "",
    fieldOfActivity: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (company) => {
    try {
      await axios.put("http://localhost:3000/companies/update", company);
      alert("Dados da companhia atualizados com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        "http://localhost:3000/companies/delete/" + company.id
      );
      // Adicione lógica adicional após a exclusão, se necessário
      localStorage.clear();
      alert("Companhia excluída com sucesso");
    } catch (error) {
      console.error("Erro ao excluir companhia", error);
    }
  };

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
                  <strong>CNPJ: </strong> {company.cpfCnpj}
                </DetailItem>
                <br></br>
                <DetailItem>
                  <strong>Nome:</strong>
                  <TextField
                    name="name"
                    placeholder={company.name}
                    onChange={handleChange}
                    value={companyData.name}
                  />
                </DetailItem>
                <DetailItem>
                  <strong>Email:</strong>
                  <TextField
                    name="email"
                    placeholder={company.email}
                    onChange={handleChange}
                    value={companyData.email}
                  />
                </DetailItem>
                <DetailItem>
                  <strong>Endereço:</strong>
                  <TextField
                    name="address"
                    placeholder={company.address}
                    onChange={handleChange}
                    value={companyData.address}
                  />
                </DetailItem>
                <DetailItem>
                  <strong>Ramo de Atividade:</strong>
                  <TextField
                    name="fieldOfActivity"
                    placeholder={company.fieldOfActivity}
                    onChange={handleChange}
                    value={companyData.fieldOfActivity}
                  />
                </DetailItem>
                <DetailItem>
                  <Button
                    onClick={() => {
                      handleUpdate({
                        cpfCnpj: company.cpfCnpj,
                        name: companyData.name,
                        email: companyData.email,
                        address: companyData.address,
                        fieldOfActivity: companyData.fieldOfActivity,
                      });
                    }}
                    text="Atualizar informações"
                  />
                  <Button
                    onClick={() => {
                      handleDelete();
                    }}
                    text="Deletar companhia"
                  />
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
