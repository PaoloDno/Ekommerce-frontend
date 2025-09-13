import React from "react";
import LoginFormComponent from "../../components/Form/LoginForm";
import { useAppContext } from "../../context/AppContext";

const LoginPage = () => {
  
  return (
    <div className="flex flex-row relative justify-center w-full max-w-screen-xl">
      <LoginFormComponent />
    </div>
  )
};

export default LoginPage;
