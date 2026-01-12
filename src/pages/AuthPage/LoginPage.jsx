import LoginFormComponent from "../../components/Form/LoginForm";
import { useAppContext } from "../../context/AppContext";

const LoginPage = () => {
  
  return (
    <div className="page-body-background in-center">
      <div className="page-body-section in-center pb-4">
      <LoginFormComponent />
      </div>
    </div>
  )
};

export default LoginPage;
