import React from "react";
import { Link } from "react-router-dom";
import { HeaderBar, Nav, Logo } from "./styles";

const Header: React.FC = () => {
  return (
    <HeaderBar>
      <Link to="/">
        <Logo>B2G</Logo>
      </Link>
      <Nav>
        <Link to="/explore">Explorar</Link>
        <Link to="/my-offers">Minhas Ofertas</Link>
        <Link to="/profile">Perfil</Link>
        <Link to="/logout">Sair</Link>
      </Nav>
    </HeaderBar>
  );
};

export default Header;
