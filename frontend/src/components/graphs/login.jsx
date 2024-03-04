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
    loading,
    
    setPassword,
  } = useContext(UserContext);
  const navigator = useNavigate();
  const [status, setStatus] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:8000/registration/login",user);
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

  const handleChange = (e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }

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
          />
          <button type="submit" disabled={loading}>Login!</button>
        </form>
        <p>{status}</p>
      </div>
    )
  );
};

export default Login;
