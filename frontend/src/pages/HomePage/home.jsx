/* eslint-disable no-unused-vars */
import NavBar from "../../components/NavigationBar/navBar.jsx";
import "./home.css";
import "../main.css"
import { useContext } from "react";
import { Link } from "react-router-dom";
import {UserContext} from "../../App.jsx"


function Home() {

    const {isAuthenticated,user} = useContext(UserContext)
    return isAuthenticated?
    (
        <>
        <NavBar />
        <div className="backgroundContainer">
            <img alt="background" className="bgImg" src="./images/background.png" />
            <div className="itemsContainer">
                <p className="webText"><b>ALiyah</b> <br />Welcome Back  {user.username}</p>
                <a className="coursesBtn" href="#">GO TO COURSES</a>
            </div>
        </div>
        </>
    ):<div>  
              
        <div className="backgroundContainer">
    <img alt="background" className="bgImg" src="./images/background.png" />
    
    <div className="itemsContainer" >
        <p className="webText"><b>ALiyah</b> <br />Your partner for learning <br />Advanced Level Mathematics!</p>
        <div className="registration-btns">
            <Link to="login" className="clickLogBtn">CLICK HERE TO LOGIN</Link>
            <Link to="register" className="clickLogBtn" >Or Register!</Link>
        </div>
    </div>
</div></div>
}

export default Home;