import NavBar from "../../components/NavigationBar/navBar.jsx";
import "../main.css";
import "./account.css"

function Signup() {
    return(
        <>
        <NavBar />
        <div className="backgroundContainer">
            <img alt="background" className="bgImg2" src="./images/background2.png"></img>
            <div className="container">
                <img alt="avatar" className="avItem2" src="./images/avatar.png"></img> 
                <p className="containerTitle">Sign up</p>
                <p className="containerText">Already have an account?&nbsp;<a href="login">Login</a></p>
                <form className="forms">
                <div className="inputLabelGrp">
                <label htmlFor="text">Your username</label>
                    <input type="text" id="username" />
                </div>    
                <div className="inputLabelGrp">
                <label htmlFor="email">Your email</label>
                    <input type="email" id="email" />
                </div>
                <div className="inputLabelGrp">
                <label htmlFor="password">Your password</label>
                    <input type="password" id="password" />
                </div>
                <button type="button" className="button">Sign up</button>
                </form>
            </div>
        </div>
        </>
    );   
}

export default Signup;