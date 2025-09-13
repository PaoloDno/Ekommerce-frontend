import HomePage from "../../pages/Homepage/HomePage.jsx";
import LandingPage from "../../pages/Landing/LandingPage.jsx";
import LoginPage from "../../pages/AuthPage/LoginPage.jsx";
import SignUpPage from "../../pages/AuthPage/SignUpPage.jsx";
import SellerPage from "../../pages/AuthPage/SellerPage.jsx";

import {Routes, Route} from "react-router-dom"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />


      <Route path="/create-store" element={<SellerPage />} />
    </Routes>
  )
};

export default AppRoutes;
