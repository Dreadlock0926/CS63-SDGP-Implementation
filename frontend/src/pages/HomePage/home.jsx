/* eslint-disable no-unused-vars */
import NavBar from "../../components/NavigationBar/navBar.jsx";
import "./home.css";
import "../main.css"
import { useState } from "react";
import { Link } from "react-router-dom";


function Home() {

    const [logged,setLogged] = useState(false) //by default i've set the user not to be logged in , that's the logic here



    return logged?
    (
        <>
        <NavBar />
        <div className="backgroundContainer">
            <img alt="background" className="bgImg" src="./images/background.png" />
            <div className="itemsContainer">
                <p className="webText"><b>ALiyah</b> <br />Your partner for learning <br />Advanced Level Mathematics!</p>
                <a className="coursesBtn" href="#">GO TO COURSES</a>
            </div>
        </div>
        </>
    ):<div>        
        <div className="backgroundContainer">
    <img alt="background" className="bgImg" src="./images/background.png" />
    <div className="itemsContainer">
        <p className="webText"><b>ALiyah</b> <br />Your partner for learning <br />Advanced Level Mathematics!</p>
        <Link to="login" style={{color:"white"}}>Click Here to Login!</Link>
    </div>
</div></div>
}

export default Home;