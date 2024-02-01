import React from "react";
import { Link } from "react-router-dom";
import { HeaderBar, Nav, Logo } from "./styles";

const Header: React.FC = () => {
  const logout = () => {
    localStorage.removeItem("user");
  };

  return (
    <HeaderBar>
      <Link to="/">
        <Logo>B2G</Logo>
      </Link>
      <Nav>
        <Link to="/feedback">Feedback</Link>
        <Link to="/approvals">Aprovações</Link>
        <Link to="/clientOffers">Minhas Ofertas</Link>
        <Link to="/clientProfile">Perfil</Link>
        <Link to="/login" onClick={logout}>
          Sair
        </Link>
      </Nav>
    </HeaderBar>
  );
};

export default Header;
