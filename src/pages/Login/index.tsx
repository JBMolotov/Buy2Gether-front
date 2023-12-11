import React, { useState } from "react";
import { Title, MainContainer, LoginContainer, Form } from "./styles";
import Button from "../../components/button";
import ShapeLogo from "../../components/shapeLogo";
import { useNavigate } from "react-router-dom";

const CompanyLogin: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <ShapeLogo />
      <LoginContainer>
        <Title>Buy 2 Gether</Title>
        <h2>Escolha seu Login</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: " 35rem",
            justifyContent: "space-between",
          }}
        >
          <Button
            text="Login como cliente"
            onClick={() => {
              window.location.href = "/clientLogin";
            }}
          />

          <Button
            text="Login como empresa"
            onClick={() => {
              window.location.href = "/companyLogin";
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: " 35rem",
            justifyContent: "space-between",
          }}
        >
          <Button
            text="Cadastre-se como cliente"
            onClick={() => {
              window.location.href = "/register";
            }}
          />

          <Button
            text="Cadastre-se como empresa"
            onClick={() => {
              window.location.href = "/registerCompany";
            }}
          />
        </div>

        {/* Forget the password section */}
        <div className="forget-password">
          <a href="#">Esqueceu a senha?</a>
        </div>
      </LoginContainer>
    </MainContainer>
  );
};

export default CompanyLogin;
