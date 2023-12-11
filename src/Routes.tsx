import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientLogin from "./pages/ClientLogin";
import CompanyLogin from "./pages/CompanyLogin";
import Login from "./pages/Login";
import RegisterClient from "./pages/Register"; // Importe o componente de registro
import RegisterCompany from "./pages/RegisterCompany";
import Approvals from "./pages/Approvals";
import ManageOffers from "./pages/ManageOffers";
import CompanyProfile from "./pages/CompanyProfile";
import ClientProfile from "./pages/ClientProfile";
import OfferCard from "./pages/Offers";
import MainPage from "./pages/Main";
import ClientOffers from "./pages/ClientOffers";

function AppRoutes() {
  return (
    <Router>
      <div>
        <Routes>
          {/* <Route path="/" exact component={Home} /> */}
          <Route path="/approvals" element={<Approvals />} />
          <Route path="/manageOffers" element={<ManageOffers />} />
          <Route path="/clientLogin" element={<ClientLogin />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/companyLogin" element={<CompanyLogin />} />
          <Route path="/register" element={<RegisterClient />} />
          <Route path="/registerCompany" element={<RegisterCompany />} />
          <Route path="/companyProfile" element={<CompanyProfile />} />
          <Route path="/clientProfile" element={<ClientProfile />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/offer/:offerId" element={<OfferCard />} />
          <Route path="/myOffers" element={<ClientOffers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes;
