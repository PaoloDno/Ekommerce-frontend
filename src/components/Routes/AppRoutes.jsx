import HomePage from "../../pages/Homepage/HomePage.jsx";
import LandingPage from "../../pages/Landing/LandingPage.jsx";
// auth
import LoginPage from "../../pages/AuthPage/LoginPage.jsx";
import SignUpPage from "../../pages/AuthPage/SignUpPage.jsx";

import LoginFormComponent from "../Form/components/LoginFormComponent.jsx";
import SignUpFormComponent from "../Form/components/SignupFormComponent.jsx";

// store
import StorePage from "../../pages/StorePage/StoreIdPage.jsx";
import StoresPage from "../../pages/StorePage/StoresPage.jsx";

// seller
import CreateStorePage from "../../pages/SellerPage/CreateStorePage.jsx";
import UserStorePage from "../../pages/SellerPage/UserStorePage.jsx";

// products
import ProductDisplayPage from "../../pages/ProductPage/ProductPageDisplay.jsx";
import AddProductPage from "../../pages/ProductPage/AddProductPage.jsx";
import ProductsPage from "../../pages/ProductPage/ProductsPage.jsx";

// category
import CategoriesPage from "../../pages/CategoriesPage/CategoriesPage.jsx";

// cart
import CartOwnerPage from "../../pages/CartPage/CartOwnerPage.jsx";

// errors
import TokenErrorPage from "../../pages/MiscPage/TokenErrorPage.jsx";
import NotAuthorizedPage from "../../pages/MiscPage/NotAuthorizePage.jsx";
import ErrorPage from "../../pages/MiscPage/ErrorPage.jsx";

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* user */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="/cart-user" element={<CartOwnerPage />} />
      {/* auth */}
      <Route path="/login" element={<LoginFormComponent />} />
      <Route path="/signup" element={<SignUpFormComponent />} />
      {/* stores */}
      <Route path="/stores" element={<StoresPage />} />
      <Route path="/store/:storeId" element={<StorePage />} />
      <Route
        path="/create-store"
        element={
          <ProtectedRoute>
            <CreateStorePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-store"
        element={
          <ProtectedRoute>
            <UserStorePage />
          </ProtectedRoute>
        }
      />
      
      {/* categories */}
      <Route path="/categories" element={<CategoriesPage />} />
      
      {/* products */}
      <Route
        path="/create-product/:storeId"
        element={
          <ProtectedRoute>
            <AddProductPage />
          </ProtectedRoute>
        }
      />
      <Route path="/product/:productId" element={<ProductDisplayPage />} />
      <Route path="/products" element={<ProductsPage />} />
      
      {/* handle errors*/}
      <Route path="/token-error" element={<TokenErrorPage />} />
      <Route path="/unauthorize" element={<NotAuthorizedPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
