/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Login = () => {
  const {
    setUser,
    user,
    setData,
    isAuthenticated,
    setIsAuthenticated,
    username,
    setUserName,
    password,
    setPassword,
  } = useContext(UserContext);
  const navigator = useNavigate();
  const [status, setStatus] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:8000/registration/login",{ username: username, password: password });
      if (response.status==200) {
        console.log(response);
        navigator("/dashboard");
        return <h1>You have logged in!</h1>;
      }
      setIsAuthenticated(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUserName(e.target.value); // Update username
    } else if (e.target.name === "password") {
      setPassword(e.target.value); // Update password
    }
    
  };

  useEffect(() => {
    console.log(JSON.stringify(user));
  }, [user]);

  return (
    !isAuthenticated && (
      <div>
        <h1>Login!</h1>
        <form onSubmit={handleLogin}>
          <input
            onChange={handleChange}
            name="username"
            placeholder="Enter username..."
            type="text"
          />
          <input
            onChange={handleChange}
            name="password"
            placeholder="Enter password..."
            type="password"
          />{" "}
          {/* Changed input type to password */}
          <button type="submit">Login!</button>
        </form>
        <p>{status}</p>
      </div>
    )
  );
};

export default Login;
