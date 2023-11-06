import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  margin: 0;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }
`;

export const FullWidthButton = styled.button`
  width: 100%;
  padding: 10px 20px;
  margin: 10px 0;
  border: none;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
  }
`;

export const StatusApproved = styled.span`
  color: green;
`;

export const StatusRejected = styled.span`
  color: red;
`;

export const StatusPending = styled.span`
  color: blue;
`;