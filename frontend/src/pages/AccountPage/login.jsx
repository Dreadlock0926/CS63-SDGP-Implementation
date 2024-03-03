/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import Axios from "axios";
import { UserContext } from "../../App";
import { useNavigate,Link } from "react-router-dom";
import NavBar from "../../components/NavigationBar/navBar.jsx";
import "../main.css";
import "./account.css";

const Login = () => {
  const BASE = "http://localhost:8000/login";

  const navigator = useNavigate();
  const {user,  loading, setLoading, setLogged, logged, setUser } =
    useContext(UserContext); //there's a problem here (context)
  const [newUser, setnewUser] = useState({ username: "", password: "" });
  const [issue,setIssue] = useState("")

  const handleChange = (e) => {
    setnewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  async function Login(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.post(BASE, newUser);
    
      if (response.status === 200) {
        console.log(response.data);
        setUser(response.data);
        setLogged(true);
        navigator("/");
      } else if (response.status === 401) {
        setIssue("Wrong Password, Please try again!");
      } else if (response.status === 404) {
        setIssue("Invalid Username, Please Check Again!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setnewUser({ username: "", password: "" });
    }
  }
  
  


  return logged?      
   <div className="backgroundContainer">
  <img
    alt="background"
    className="bgImg2"
    src="./images/background2.png"/>
  <div className="container">
    <img alt="avatar" className="avItem2" src="./images/avatar.png" />
    <h1 style={{textAlign:"center"}}>Hi {user.Session.username} your logged in!</h1>
  </div>
</div>:(
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
            Dont have an account?&nbsp;<Link to="/register" style={{color:"black"}}>Register</Link>
          </p>
          <form onSubmit={Login} className="forms">
            <div className="inputLabelGrp">
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
          <p>{issue}</p>
        </div>
      </div>
    </>
  );
};

export default Login;
