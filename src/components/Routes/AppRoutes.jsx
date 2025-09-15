import HomePage from "../../pages/Homepage/HomePage.jsx";
import LandingPage from "../../pages/Landing/LandingPage.jsx";
// auth
import LoginPage from "../../pages/AuthPage/LoginPage.jsx";
import SignUpPage from "../../pages/AuthPage/SignUpPage.jsx";
// store
import StoresPage from "../../pages/StorePage/StoresPage.jsx";
import CreateStorePage from "../../pages/AuthPage/SellerPage.jsx";
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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      {/* stores */}
      <Route path="/stores" element={<StoresPage />} />
      <Route path="/create-store/:id" element={<CreateStorePage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      {/* stores */}
      <Route path="/sell-products" element={<AddProductPage />} />
      <Route path="/product" element={<ProductDisplayPage />} />
    </Routes>
  )
};

export default AppRoutes;
