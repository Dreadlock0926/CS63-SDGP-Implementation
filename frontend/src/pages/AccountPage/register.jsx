import { useState } from "react";
import axios from "axios";
import NavBar from "../../components/NavigationBar/navBar.jsx";
import "../main.css";
import "./account.css"

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("backend/routes/register.js", { username, password });
          setAlert(response.data.Alert);
        } catch (error) {
          setAlert(error.response.data.Alert);
        }
      };


    return(
        <>
        <NavBar />
        <div className="backgroundContainer">
            <img alt="background" className="bgImg2" src="./images/background2.png"></img>
            <div className="container">
                <img alt="avatar" className="avItem2" src="./images/avatar.png"></img> 
                <p className="containerTitle">Register</p>
                <p className="containerText">Already have an account?&nbsp;<a href="login">Login</a></p>
                <form onSubmit={handleSubmit} className="forms">
                <div className="inputLabelGrp">
                <label htmlFor="text">Your username</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username here..." />
                </div>    
                <div className="inputLabelGrp">
                <label htmlFor="email">Your email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email here..." />
                </div>
                <div className="inputLabelGrp">
                <label htmlFor="password">Your password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password here..." />
                </div>
                <button type="button" className="button">Register</button>
                </form>
                {alert && <p>{alert}</p>}
            </div>
        </div>
        </>
    );   
}

export default Register;