import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: row;
`;

export const OfferContainer = styled.div`
  // display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  background-color: pink;
`;

export const OfferList = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  list-style: none;
  padding: 0;
  li:nth-child(even) {
    background-color: #eee;
  }
`;

export const OfferItemWrapper = styled.li`
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

export const OfferForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  background-color: #eee;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  width: 80%;
  padding: 1rem 5rem;
  margin: 2rem auto;
`;

export const FormLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

export const FormInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  -webkit-appearance: none;
`;

export const OfferTable = styled.table`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  border-collapse: collapse;
`;

export const OfferTableRow = styled.tr`
  border-bottom: 1px solid #ccc;
  &:nth-child(even) {
    background-color: #eee;
  }
`;

export const OfferTableHeader = styled.th`
  text-align: left;
  padding: 10px;
  background-color: #f0f0f0;
`;

export const OfferTableCell = styled.td`
  padding: 0 1rem;
  text-align: left;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
`;

export const StickyOfferTable = styled(OfferTable)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: white;
`;
