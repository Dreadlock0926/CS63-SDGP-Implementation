import NavBar from "../../components/NavigationBar/navBar.jsx";
import "../main.css";
import "./account.css"


function Login() {
    return(
        <>
        <NavBar />
        <div className="backgroundContainer">
            <img alt="background" className="bgImg2" src="./images/background2.png"></img>
            <div className="container">
                <img alt="avatar" className="avItem2" src="./images/avatar.png"></img> 
                <p className="containerTitle">Login</p>
                <p className="containerText">Dont have an account?&nbsp;<a href="register">Register</a></p>
                <form className="forms">
                <div className="inputLabelGrp">
                <label htmlFor="email">Your email</label>
                    <input type="email" id="email" placeholder="Enter your email here..." />
                </div>
                <div className="inputLabelGrp">
                <label htmlFor="password">Your password</label>
                    <input type="password" id="password" placeholder="Enter your password here..." />
                </div>
                <button type="button" className="button">Login</button>
                </form>
            </div>
        </div>
        </>
    );   
}

export default Login;