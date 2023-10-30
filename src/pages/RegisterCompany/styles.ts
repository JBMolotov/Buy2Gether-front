import styled from "styled-components";

export const Title = styled.h1`
  font-size: 5rem;
  margin: 0;
  font-family: "Xanh Mono";
`;

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

export const RegisterContainer = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
  padding: 2rem;
  justify-content: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Button = styled.button`
  margin: 0.5rem 0;
  padding: 0.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

export const ErrorMsg = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-top: -0.3rem;
`;
