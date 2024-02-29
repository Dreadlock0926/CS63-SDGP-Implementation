/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

const Login = () => {
  const { setUser,user, setData, isAuthenticated, setIsAuthenticated } = useContext(UserContext);
  const navigator = useNavigate();
  const [status,setStatus]  =useState("");



  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("http://localhost:8000/registration/login", user);
      setData(data.User);
      console.log(data);
      if(data.status===200){
        return <h1>You have logged in!</h1>
      }
      setStatus(data.response);
      navigator("/dashboard");
    } catch (err) {
      console.error(err);
    }
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  useEffect(()=>{
    console.log(JSON.stringify(user));
  },[user])


  return !isAuthenticated && (
    <div>
      <h1>Login!</h1>
      <form onSubmit={handleLogin}>
        <input onChange={handleChange} name="username" placeholder="Enter username..." type="text" />
        <input onChange={handleChange} name="password" placeholder="Enter password..." type="password" /> {/* Changed input type to password */}
        <button type="submit">Login!</button>
      </form>
      <p>{status}</p>
    </div>
  )
}

export default Login;
