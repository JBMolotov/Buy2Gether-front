import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeaderBar, Nav, Logo } from "./styles";

const Header: React.FC = () => {
  const [userType, setUserType] = useState(localStorage.getItem("userType"));

  const handleLogout = () => {
    localStorage.setItem("userToken", "");
    localStorage.setItem("userType", "");
    setUserType("");
  };

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType !== userType) {
      setUserType(storedUserType);
    }
  }, [userType]);

  return (
    <HeaderBar>
      <Link to="/">
        <Logo>B2G</Logo>
      </Link>
      <Nav>
        {userType === "client" && (
          <>
            <Link to="/">Explorar</Link>
            <Link to="/myOffers">Minhas Ofertas</Link>
            <Link to="/clientProfile">Perfil</Link>
          </>
        )}
        {userType === "company" && (
          <>
            <Link to="/manageOffers">Gerenciar Ofertas</Link>
            <Link to="/companyProfile">Perfil</Link>
          </>
        )}
        <Link to="/login" onClick={handleLogout}>
          Sair
        </Link>
      </Nav>
    </HeaderBar>
  );
};

export default Header;
