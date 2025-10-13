import HomePage from "../../pages/Homepage/HomePage.jsx";
import LandingPage from "../../pages/Landing/LandingPage.jsx";
// auth
import LoginPage from "../../pages/AuthPage/LoginPage.jsx";
import SignUpPage from "../../pages/AuthPage/SignUpPage.jsx";

import LoginFormComponent from "../Form/components/LoginFormComponent.jsx";
import SignUpFormComponent from "../Form/components/SignupFormComponent.jsx";

// store
import StoresPage from "../../pages/StorePage/StoresPage.jsx";

// seller
import CreateStorePage from "../../pages/SellerPage/CreateStorePage.jsx";
import UserStorePage from "../../pages/SellerPage/UserStorePage.jsx";
// products
import ProductDisplayPage from "../../pages/ProductPage/ProductPageDisplay.jsx";
import AddProductPage from "../../pages/ProductPage/AddProductPage.jsx";
// category
import CategoriesPage from "../../pages/CategoriesPage/CategoriesPage.jsx";
// cart
import CartOwnerPage from "../../pages/CartPage/CartOwnerPage.jsx";



import {Routes, Route} from "react-router-dom"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* user */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/cart-user" element={<CartOwnerPage />} />
      {/* auth */}
      <Route path="/login" element={<LoginFormComponent />} />
      <Route path="/signup" element={<SignUpFormComponent />} />
      {/* stores */}
      <Route path="/stores" element={<StoresPage />} />
      <Route path="/create-store" element={<CreateStorePage />} />
      <Route path="/user-store" element={<UserStorePage />} />
      {/* categories */}
      <Route path="/categories" element={<CategoriesPage />} />
      {/* products */}
      <Route path="/create-product/:storeId" element={<AddProductPage />} />
      <Route path="/product" element={<ProductDisplayPage />} />
    </Routes>
  )
};

export default AppRoutes;
