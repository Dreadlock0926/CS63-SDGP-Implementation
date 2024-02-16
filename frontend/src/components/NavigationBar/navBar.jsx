import "./navBar.css";
import "../../pages/main.css";
import { useContext } from "react";
import {UserContext} from "../../App"

const NavBar = () => {

    const {logged} = useContext(UserContext);
    return !logged? (
        <>
            <div className="navBar">
                <img alt="site-logo" className="siteLogo" src="./images/logo.svg"></img>
                <nav className="navContainer">
                    <a className="navItem" href="/">Home</a>
                    <a className="navItem" href="#">About</a>
                    <a className="navItem" href="#">Courses</a>
                    <a className="navItem" href="#">Support</a>
                    <a className="navItem" href="questions">Test</a>
                </nav>
                <div className="logContainer">
                    <a className="loginBtn" href="login">Login</a>
                    <a className="registerBtn" href="register">Register</a>
                </div>
            </div>
        </>
    ):( <div className="navBar">
    <img alt="site-logo" className="siteLogo" src="./images/logo.svg"></img>
    <nav className="navContainer">
        <a className="navItem" href="/">Home</a>
        <a className="navItem" href="#">About</a>
        <a className="navItem" href="#">Courses</a>
        <a className="navItem" href="#">Support</a>
        <a className="navItem" href="questions">Test</a>
    </nav>
</div>);
};

export default NavBar;