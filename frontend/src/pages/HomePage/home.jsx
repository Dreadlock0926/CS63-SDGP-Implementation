/* eslint-disable no-unused-vars */
import NavBar from "../../components/NavigationBar/navBar.jsx";
import "./home.css";
import "../main.css"
import { useContext } from "react";
import { Link } from "react-router-dom";
import {UserContext} from "../../App.jsx"


function Home() {

    const {logged,user} = useContext(UserContext)
    return logged?
    (
        <>
        <NavBar />
        <div className="backgroundContainer">
            <img alt="background" className="bgImg" src="./images/background.png" />
            <div className="itemsContainer">
                <p className="webText"><b>ALiyah</b> <br />Welcome Back  {user.Session.username}</p>
                <a className="coursesBtn" href="#">GO TO COURSES</a>
            </div>
        </div>
        </>
    ):<div>        
        <div className="backgroundContainer">
    <img alt="background" className="bgImg" src="./images/background.png" />
    <div className="itemsContainer">
        <p className="webText"><b>ALiyah</b> <br />Your partner for learning <br />Advanced Level Mathematics!</p>
        <Link to="login" className="clickLogBtn">CLICK HERE TO LOGIN</Link>
    </div>
</div></div>
}

export default Home;