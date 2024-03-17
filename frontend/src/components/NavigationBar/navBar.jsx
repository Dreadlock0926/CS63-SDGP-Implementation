import "./navBar.css";
import "../../pages/main.css";

const NavBar = () => {
  return (
    <>
      <div className="navBar">
        <nav className="navContainer">
          <a className="navItem" href="/">
            Home
          </a>
          <a className="navItem" href="#">
            About
          </a>
          <a className="navItem" href="select-course">
            Courses
          </a>
          <a className="navItem" href="#">
            Support
          </a>
          <a className="navItem" href="questions">
            Test
          </a>
          <a className="navItem" href="dashboard">
            Progression
          </a>
          <a className="navItem" href="authenticate">
            Auth
          </a>
        </nav>
        <div className="logContainer">
          <a className="loginBtn" href="login">
            Login
          </a>
          <a className="signupBtn" href="registration">
            Sign up
          </a>
        </div>
      </div>
    </>
  );
};

export default NavBar;
