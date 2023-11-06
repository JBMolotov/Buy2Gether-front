import styled, { css } from "styled-components";

export const ApprovalsTable = styled.table`
  width: ${(props) => props.width};
  max-width: 100%;
  margin: 0 auto; // Center the table
  border-collapse: collapse;

  th,
  td {
    text-align: left;
    padding: 12px;
  }

  tbody tr:nth-child(odd) {
    background-color: #f9f9f9;
  }

  @media (max-width: 768px) {
    &,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    tr {
      margin-bottom: 1rem;
    }

    td {
      position: relative;
      padding-left: 50%;
      text-align: right;

      &:before {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        padding-right: 10px;
        white-space: nowrap;
        content: attr(data-label);
        text-align: left;
        font-weight: bold;
      }
    }
  }
`;
export const StatusButton = styled.button<{ reject?: boolean }>`
  padding: 10px;
  margin-right: 5px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.reject ? "#F44336" : "#4CAF50")};
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

interface StatusDisplayProps {
  status: "Aprovado" | "Rejeitado" | "Pendente";
}

export const StatusDisplay = styled.span<StatusDisplayProps>`
  color: ${({ status }) => {
    switch (status) {
      case "Aprovado":
        return "green";
      case "Rejeitado":
        return "red";
      case "Pendente":
        return "grey";
      default:
        return "black";
    }
  }};
`;
