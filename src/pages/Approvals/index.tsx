import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import { ApprovalsTable, StatusButton, StatusDisplay } from "./styles";
import Header from "../../components/header/Header";
import axios from "axios";

type ApprovalItem = {
  id: number;
  cpfCnpj: string;
  fieldOfActivity: string;
  name: string;
  // status: "Aprovado" | "Rejeitado" | "Pendente";
  isApproved?: boolean;
};

const getApprovals = async (): Promise<ApprovalItem[]> => {
  try {
    const response = await axios.get(
      "http://localhost:3000/companies/searchAll"
    );
    const approvals = response.data;
    console.log(response.data);
    return approvals;
  } catch (error) {
    console.error("Erro ao buscar aprovações:", error);
    return [];
  }
};

const Approvals: React.FC = () => {
  const [items, setItems] = useState<ApprovalItem[]>();

  useEffect(() => {
    const fetchApprovals = async () => {
      const approvals = await getApprovals();
      setItems(approvals);
    };
    fetchApprovals();
  }, []);

  const handleStatusChange = async (id: number) => {
    try {
      await axios.put("http://localhost:3000/superAdmin/approveCompany/" + id);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao mudar status:", error);
    }
  };

  if (!items && items?.length === 0) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <Header />
      <Card>
        <h1>Aprovação de Empresas</h1>
        <ApprovalsTable width="70%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome da Empresa</th>
              <th>CNPJ</th>
              <th>Ramo de Atividade</th>
              <th>Status</th>
              <th>Aprovação</th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <a href={"companyProfile?" + item.id}>
                    <td>{item.name}</td>
                  </a>
                  <td>{item.cpfCnpj}</td>
                  <td>{item.fieldOfActivity}</td>
                  <td>
                    <StatusDisplay isApproved={item.isApproved}>
                      {item.isApproved === true && "Aprovado"}
                      {item.isApproved === false && "Não aprovado"}
                    </StatusDisplay>
                  </td>
                  <td>
                    {!item.isApproved && (
                      <>
                        <StatusButton
                          onClick={() => handleStatusChange(item.id)}
                        >
                          Aprovar
                        </StatusButton>
                        {/* <StatusButton
                          reject
                          onClick={() =>
                            handleStatusChange(item.id, "Rejeitado")
                          }
                        >
                          Reprovar
                        </StatusButton> */}
                      </>
                    )}
                    {/* {item.status === "Aprovado" && (
                      <span>Empresa aprovada</span>
                    )}
                    {item.status === "Rejeitado" && (
                      <span>Empresa reprovada</span>
                    )} */}
                  </td>
                  {/* <td>{item.approver}</td> */}
                </tr>
              ))}
          </tbody>
        </ApprovalsTable>
      </Card>
    </>
  );
};

export default Approvals;
