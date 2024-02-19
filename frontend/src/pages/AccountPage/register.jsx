/* eslint-disable no-unused-vars */
import Axios from "axios";
import { UserContext } from "../../App";
import { useContext, useState } from "react";
import {useNavigate} from "react-router-dom"
import NavBar from "../../components/NavigationBar/navBar.jsx";
import "../main.css";
import "./account.css";

const Register = () => {
  const navigator = useNavigate();
  const { loading, setLoading, setLogged, setUser,status,setStatus } = useContext(UserContext);
  const [newUser, setNewUser] = useState({ username: "", password: "" });


  const handleChange = (e) => {~
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  };

  async function handleRegister(e) {
    e.preventDefault();
    try {
      //   setLoading(true);
      const loginUser = await Axios.post(
        "http://localhost:8000/register",
        newUser
      );

      
      alert("You're registered,  Please login to Continue!")
      if (loginUser.status === 201) {
        navigator("/login")

        
       
      }else if(loginUser.response.status===409){
        alert(`${newUser.username} Already Taken!`)
      }
    } catch (err) {
      console.error(err);
    } finally {
      //   setLoading(false);
      setNewUser({username: "", password: ""});
    }
  }

  return loading ? (
    "Loading..."
  ) : (
    <>
      <NavBar />
      <div className="backgroundContainer">
        <img alt="background" className="bgImg2" src="./images/background2.png"/>
        <div className="container">
          <img alt="avatar" className="avItem2" src="./images/avatar.png"/>
          <p className="containerTitle">Register</p>
          <p className="containerText">
            Already have an account?&nbsp;<a href="login" style={{color:"black"}}>Login</a>
          </p>
          <form onSubmit={handleRegister} className="forms">
            <div className="inputLabelGrp">
              <label htmlFor="username">Your username</label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
                placeholder="Enter your username here..."
              />
            </div>
            <div className="inputLabelGrp">
              <label htmlFor="password">Your password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter your password here..."
              />
            </div>
            <button type="submit" className="button" disabled={loading} >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
