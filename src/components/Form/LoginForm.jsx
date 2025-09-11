import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { loginAction } from "../../store/actions/AuthThunks";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const LoginFormComponent = () => {
  const { username } = useAppContext(); // ✅ Correct place for hook
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userCreds, setUserCreds] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCreds((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sanitizedCreds = {
      username: sanitizeInput(userCreds.username),
      password: sanitizeInput(userCreds.password),
    };

    const resultAction = await dispatch(loginAction(sanitizedCreds));

    if (loginAction.fulfilled.match(resultAction)) {
      console.log("Login successful");
      const timeoutId = setTimeout(() => {
        navigate("/home");
      }, 1500);
      return () => clearTimeout(timeoutId);
    } else {
      console.log("Login failed. Please check your username and password.");
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center">
      {username ? (
        <div className="flex w-full h-full">Welcome, {username}!</div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={userCreds.username}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userCreds.password}
            onChange={handleChange}
            className="border p-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginFormComponent;
