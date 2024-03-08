/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { UserContext } from "../../App";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../../components/NavigationBar/navBar.jsx";
import "../main.css";
import "./account.css";

const Login = () => {
  const BASE = "http://localhost:8000/login";

  const navigator = useNavigate();
  const {
    user,
    loading,
    setLoading,
    setIsAuthenticated,
    IsAuthenticated,
    setUser,
    setData,
    data,
    status,
    setStatus,
  } = useContext(UserContext); //there's a problem here (context)

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  async function Login(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.post(BASE, user);

      if (response.status === 200) {
        setStatus(`${user.username} Logged in!`);
        console.log(response.data);
        setData(response.data); //PROBLEM HERE
        setIsAuthenticated(true);
      
        navigator("/");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        setStatus("Wrong password");
      } else if (error.response && error.response.status === 400) {
        setStatus("Wrong username!");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    console.log(`The global state = ${JSON.stringify(data)}`);
  },[data])

  return IsAuthenticated ? (
    <div className="backgroundContainer">
      <img alt="background" className="bgImg2" src="./images/background2.png" />
      <div className="container">
        <img alt="avatar" className="avItem2" src="./images/avatar.png" />
        <h1 style={{ textAlign: "center" }}>
          Hi {data.username} your logged in!
        </h1>
      </div>
    </div>
  ) : (
    <>
      <NavBar />
      <div className="backgroundContainer">
        <img
          alt="background"
          className="bgImg2"
          src="./images/background2.png"
        />
        <div className="container">
          <img alt="avatar" className="avItem2" src="./images/avatar.png" />
          <p className="containerTitle">Login</p>
          <p className="containerText">
            Dont have an account?&nbsp;
            <Link to="/register" style={{ color: "black" }}>
              Register
            </Link>
          </p>
          <form onSubmit={Login} className="forms">
            <div className="inputLabelGrp">
              <h1>{status}</h1>
              <label htmlFor="username">Your username</label>
              <input
                onChange={handleChange}
                type="text"
                id="username"
                name="username" //added name here cuz the we're targeting target value by referring to the name
                placeholder="Enter your username here..."
              />
            </div>
            <div className="inputLabelGrp">
              <label htmlFor="password">Your password</label>
              <input
                onChange={handleChange}
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password here..."
              />
            </div>
            <button type="submit" className="button" disabled={loading}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
