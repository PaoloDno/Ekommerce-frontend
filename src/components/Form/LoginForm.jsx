import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { loginAction } from "../../store/actions/AuthThunks";

const sanitizeInput = (input) => {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  return input.replace(/[&<>"'/]/g, (match) => map[match]);
};

const LoginFormComponent = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userCreds, setUserCreds] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value} = e.target;
    setUserCreds((prev) => ({ ...prev, [name]: value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sanitizedCreds = {
      username: sanitizeInput(userCreds.username),
      password: sanitizeInput(userCreds.password),
    };

    const resultAction = await dispatch(loginAction(sanitizedCreds));

    if (loginAction.fulfilled.match(resultAction)) {
      console.log('login successful');
      const timeoutId = setTimeout(() => {
        navigate('/home');
      }, 1500);
      return () => clearTimeout(timeoutId);
    } else {
      console.log('Login failed. Please check your username and password.');
    };
  }  

  return (
    <div className="flex flex-col items-center justify-start w-full">
    {
      
    }    
    </div>
  )
};

export default LoginFormComponent;
