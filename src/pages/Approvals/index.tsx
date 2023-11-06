import React, { useState } from "react";
import Card from "../../components/card/Card";
import { ApprovalsTable, StatusButton, StatusDisplay } from "./styles";
type ApprovalItem = {
  id: number;
  cnpj: string;
  fieldOfActivity: string;
  companyName: string;
  status: "Aprovado" | "Rejeitado" | "Pendente";
  approver: string;
};

const initialData: ApprovalItem[] = [
  {
    id: 1,
    cnpj: "12.345.678/0001-91",
    fieldOfActivity: "Tecnologia",
    companyName: "TickTech",
    status: "Pendente",
    approver: "Super Admin",
  },
  {
    id: 2,
    cnpj: "23.456.789/0001-92",
    fieldOfActivity: "Finanças",
    companyName: "FinTeste",
    status: "Pendente",
    approver: "Super Admin",
  },
  {
    id: 3,
    cnpj: "34.567.890/0001-93",
    fieldOfActivity: "Saúde",
    companyName: "TesteCura",
    status: "Pendente",
    approver: "Super Admin",
  },
];

const Approvals: React.FC = () => {
  const [items, setItems] = useState(initialData);

  const handleStatusChange = (
    itemId: number,
    newStatus: "Aprovado" | "Rejeitado"
  ) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <Card>
      <ApprovalsTable width="60%">
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
              <td>{item.cnpj}</td>
              <td>{item.fieldOfActivity}</td>
              <td>
                <StatusDisplay status={item.status}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </StatusDisplay>
              </td>
              <td>
                {item.status === "Pendente" && (
                  <>
                    <StatusButton
                      onClick={() => handleStatusChange(item.id, "Aprovado")}
                    >
                      Aprovar
                    </StatusButton>
                    <StatusButton
                      reject
                      onClick={() => handleStatusChange(item.id, "Rejeitado")}
                    >
                      Reprovar
                    </StatusButton>
                  </>
                )}
                {item.status === "Aprovado" && <span>Empresa aprovada</span>}
                {item.status === "Rejeitado" && <span>Empresa reprovada</span>}
              </td>
              <td>{item.approver}</td>
            </tr>
          ))}
        </tbody>
      </ApprovalsTable>
    </Card>
  );
};

export default Approvals;
