/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import Axios from "axios";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavigationBar/navBar.jsx";
import "../main.css";
import "./account.css";

const Login = () => {
  const BASE = "http://localhost:8000/login";

  const navigator = useNavigate();
  const { loading, setLoading, setLog, log, setUser, setStatus, status } =
    useContext(UserContext); //there's a problem here (context)
  const [newUser, setnewUser] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setnewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  async function Login(e) {
    e.preventDefault();
    if (log === true) { //context issue so this won't work , which is why it doesn't move past this
      alert(`${newUser.username} already logged in!`);
    } else {
      try {
        setLoading(true);
        const loginUser = await Axios.post(BASE, newUser);
        if (loginUser.status === 200) {
          setStatus(loginUser.data.username);
          setLog(true);
          setUser(loginUser.data);
          console.log(loginUser.data);

          setTimeout(() => {
            navigator("/");
          }, 1000);
        } else if (loginUser.status === 404) {
          alert("Username does not exist!") 
        } else if (loginUser.status === 401) {
          alert("Incorrect Password!");
        } else if (loginUser.status === 400) { //handle status codes from top to bottom refer to login.js backend file
          alert("Username and Password are missing!");
        } else {
          alert("Technical issue , kindly refresh and try again! 🥹");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setnewUser({username: "", password: ""});
      }
    }
  }



  return loading ? (
    "Loading..."
  ) : (
    <>
      <NavBar />
      <div className="backgroundContainer">
        <img
          alt="background"
          className="bgImg2"
          src="./images/background2.png"/>
        <div className="container">
          <img alt="avatar" className="avItem2" src="./images/avatar.png" />
          <p className="containerTitle">Login</p>
          <p className="containerText">
            Dont have an account?&nbsp;<a href="register">Register</a>
          </p>
          <form onSubmit={Login} className="forms">
            <div className="inputLabelGrp">
              <label htmlFor="username">Your username</label>
              <input
                onChange={handleChange}
                type="text"
                id="username"
                placeholder="Enter your username here..."
              />
            </div>
            <div className="inputLabelGrp">
              <label htmlFor="password">Your password</label>
              <input
                onChange={handleChange}
                type="password"
                id="password"
                placeholder="Enter your password here..."
              />
            </div>
            <button type="submit" className="button">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
