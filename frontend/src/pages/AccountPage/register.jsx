/* eslint-disable no-unused-vars */
import Axios from "axios";
import { UserContext } from "../../App";
import { useContext, useState } from "react";
import NavBar from "../../components/NavigationBar/navBar.jsx";
import "../main.css";
import "./account.css";

const Register = () => {
  const { loading, setLoading, setLog, setUser,status,setStatus } = useContext(UserContext);
  const [newUser, setNewUser] = useState({ username: "", password: "" });
  const [state, setState] = useState(""); //this is teh temporary 

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
      if (loginUser.status === 201) {
        navigator("/login")

        //There's an context issue here!
        // setLog(true);
        // setUser(loginUser.data);
        // setStatus(`${newUser.username} Logged in!`);

        console.log(loginUser.data);

        alert(`${newUser.username} Registered!`);
        // setTimeout(() => {
        //   navigator("/");
        // }, 2000);
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
            Already have an account?&nbsp;<a href="login">Login</a>
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
