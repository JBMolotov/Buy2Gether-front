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
        <Link to="/">Explorar</Link>
        <Link to="/myOffers">Minhas Ofertas</Link>
        <Link to="/clientProfile">Perfil</Link>
        <Link to="/logout">Sair</Link>
      </Nav>
    </HeaderBar>
  );
};

export default Header;
