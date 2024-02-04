import NavBar from "../../components/NavigationBar/navBar.jsx";
import "../main.css";
import "./login.css"


function Login() {
    return(
        <>
        <NavBar />
        <div className="backgroundContainer">
            <img alt="background" className="bgImg2" src="./images/background2.png"></img>
            <div className="loginContainer">
                <img alt="avatar" className="avItem2" src="./images/avatar.png"></img> 
                <p className="loginTitle">Login</p>
                <p className="loginText">Dont have an account?&nbsp;<a href="/">Sign up</a></p>
                <form className="loginForm">
                <label htmlFor="email">Email</label>
                    <input type="email" id="email" />
                <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                </form>
            </div>
        </div>
        </>
    );   
}

export default Login;