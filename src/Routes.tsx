import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Importe o componente de registro

function AppRoutes() {
  return (
    <Router>
      <div>
        <Routes>
          {/* <Route path="/" exact component={Home} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes;
