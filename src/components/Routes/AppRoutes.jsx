import React from "react"
import HomePage from "../../pages/HomePage";
import LandingPage from "../../pages/LandingPage";
import LoginPage from "../../pages/LoginPage";
import SignUpPage from "../../pages/SignUpPage";

import {Routes, Route} from "react-router-dom"

const AppRoutes = (props) => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
};

export default AppRoutes;
