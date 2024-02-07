import NavBar from "../../components/NavigationBar/navBar.jsx";
import "../main.css";
import "./account.css"

const Register = () => {
    return(
        <>
        <NavBar />
        <div className="backgroundContainer">
            <img alt="background" className="bgImg2" src="./images/background2.png"></img>
            <div className="container">
                <img alt="avatar" className="avItem2" src="./images/avatar.png"></img> 
                <p className="containerTitle">Register</p>
                <p className="containerText">Already have an account?&nbsp;<a href="login">Login</a></p>
                <form className="forms">
                <div className="inputLabelGrp">
                <label htmlFor="text">Your username</label>
                    <input type="text" id="username" placeholder="Enter your username here..." />
                </div>    
                <div className="inputLabelGrp">
                <label htmlFor="password">Your password</label>
                    <input type="password" id="password" placeholder="Enter your password here..." />
                </div>
                <button type="submit" className="button">Register</button>
                </form>
            </div>
        </div>
        </>
    );   
}

export default Register;