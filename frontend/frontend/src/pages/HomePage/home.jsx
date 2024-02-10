import NavBar from "../../components/NavigationBar/navBar.jsx";
import "./home.css";
import "../main.css"


function Home() {
    return(
        <>
        <NavBar />
        <div className="backgroundContainer">
            <img alt="background" className="bgImg" src="./images/background.png"></img>
            <div className="webTitle">ALiyah</div>
            <div className="webSub">Your partner for learning Advanced Level Mathematics!</div>
        </div>
        </>
    );   
}

export default Home;