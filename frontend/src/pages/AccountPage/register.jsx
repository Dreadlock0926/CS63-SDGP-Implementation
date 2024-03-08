import Axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavigationBar/navBar.jsx";
import "../main.css";
import "./account.css";
import { UserContext } from "../../App.jsx";

const Register = () => {
  const navigator = useNavigate();
  const { loading, setLoading } = useContext(UserContext);
  const [newUser, setNewUser] = useState({ username: "", password: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatus("")
    try {
      setLoading(true);
      const response = await Axios.post("http://localhost:8000/register", newUser);

      if (response.status === 201) {
        setStatus("You are registered!")
        setTimeout(()=>{    
      navigator("/login");
        },1000);
  
      } 
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setStatus(`${newUser.username} Already Taken!`);
      } else {
        setStatus("An error occurred while registering. Please try again later.");
      }
      console.error(err);
    } finally {
      setLoading(false);
      setNewUser({ username: "", password: "" });
    }
  };

  return (
    <>
      <NavBar />
      <div className="backgroundContainer">
    
        <img alt="background" className="bgImg2" src="./images/background2.png" />
        <div className="container">
          <img alt="avatar" className="avItem2" src="./images/avatar.png" />
          <p className="containerTitle">Register</p>
          <p className="containerText">
            Already have an account?&nbsp;<a href="login" style={{ color: "black" }}>Login</a>
          </p>
          <form onSubmit={handleRegister} className="forms">
            <div className="inputLabelGrp">
            <p>{status}</p>
              <label htmlFor="username">Your username</label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
                placeholder="Enter your username here..."
                required
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
                required
              />
            </div>
            <button type="submit" className="button" disabled={loading}>
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
