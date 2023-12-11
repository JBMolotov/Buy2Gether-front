import React, { useState, useEffect } from "react";
import Card from "../../components/card/Card";
import { ApprovalsTable, StatusButton, StatusDisplay } from "./styles";
import Header from "../../components/header/Header";

type ApprovalItem = {
  id: number;
  cpfCnpj: string;
  fieldOfActivity: string;
  companyName: string;
  isApproved: boolean;
  approver: string;
};

const Approvals: React.FC = () => {
  const [items, setItems] = useState<ApprovalItem[]>([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/companies/searchAll`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const getStatus = (
    isApproved: boolean | undefined
  ): "Pendente" | "Aprovado" | "Rejeitado" => {
    if (isApproved === null || isApproved === undefined) {
      return "Pendente";
    }
    return isApproved ? "Aprovado" : "Rejeitado";
  };

  const handleStatusChange = async (itemId: number, isApproved: boolean) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/superAdmin/approveCompany/${itemId}`,
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isApproved }),
        }
      );

      if (response.ok) {
        setItems(
          items.map((item) =>
            item.id === itemId ? { ...item, isApproved: isApproved } : item
          )
        );
      } else {
        // Handle errors
        console.error("Error updating status");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

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
              <th>Aprovado/Rejeitado Por</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.companyName}</td>
                <td>{item.cpfCnpj}</td>
                <td>{item.fieldOfActivity}</td>
                <td>
                  <StatusDisplay status={getStatus(item.isApproved)}>
                    {getStatus(item.isApproved)}
                  </StatusDisplay>
                </td>
                <td>
                  {getStatus(item.isApproved) === "Pendente" && (
                    <>
                      <StatusButton
                        onClick={() => handleStatusChange(item.id, true)}
                      >
                        Aprovar
                      </StatusButton>
                      <StatusButton
                        reject
                        onClick={() => handleStatusChange(item.id, false)}
                      >
                        Reprovar
                      </StatusButton>
                    </>
                  )}
                  {getStatus(item.isApproved) === "Aprovado" && (
                    <span>Empresa aprovada</span>
                  )}
                  {getStatus(item.isApproved) === "Rejeitado" && (
                    <span>Empresa reprovada</span>
                  )}
                </td>
                <td>{item.approver}</td>
              </tr>
            ))}
          </tbody>
        </ApprovalsTable>
      </Card>
    </>
  );
};

export default Approvals;
