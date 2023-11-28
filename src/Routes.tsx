import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Importe o componente de registro
import RegisterCompany from "./pages/RegisterCompany";
import Approvals from "./pages/Approvals";
import ManageOffers from "./pages/ManageOffers";
import CompanyProfile from "./pages/CompanyProfile";
import ClientProfile from "./pages/ClientProfile";
import ClientOffers from "./pages/ClientOffers";

function AppRoutes() {
  return (
    <Router>
      <div>
        <Routes>
          {/* <Route path="/" exact component={Home} /> */}
          <Route path="/approvals" element={<Approvals />} />
          <Route path="/manageOffers" element={<ManageOffers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registerCompany" element={<RegisterCompany />} />
          <Route path="/companyProfile" element={<CompanyProfile />} />
          <Route path="/clientProfile" element={<ClientProfile />} />
          <Route path="/clientOffers" element={<ClientOffers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes;
