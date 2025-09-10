import React from "react"
import HomePage from "../../pages/HomePage";
import LandingPage from "../../pages/Landing/LandingPage.jsx";
import LoginPage from "../../pages/LoginPage";

import {Routes, Route} from "react-router-dom"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
};

export default AppRoutes;
