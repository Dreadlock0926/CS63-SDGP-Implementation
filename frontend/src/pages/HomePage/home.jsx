import NavBar from "../../components/NavigationBar/navBar.jsx";
import "./home.css";
import "../main.css"


function Home() {
    return(
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
    );   
}

export default Home;