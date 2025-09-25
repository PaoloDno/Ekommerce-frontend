import LoginFormComponent from "../../components/Form/LoginForm";
import { useAppContext } from "../../context/AppContext";

const LoginPage = () => {
  
  return (
    <div className="flex flex-col relative justify-center w-full 
    max-w-screen-xl overflow-x-hidden py-2 bg-transparent">
      <LoginFormComponent />
    </div>
  )
};

export default LoginPage;
