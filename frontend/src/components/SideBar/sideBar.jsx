import "./sideBar.css";

const SideBar = () => {
    return(
        <>
            <div className="sideBarContainer">
                <img className="sideBarLogo" alt="site-logo" src="./images/logo.svg" />
                <hr/>
                <nav className="itemContainer">
                    <a className="sideItem" href="/">Home</a>
                    <a className="sideItem" href="#">Courses</a>
                    <a className="sideItem" href="#">Support</a>
                </nav>
                <hr />
                <div className="btnContainer">
                <button><img className="btnIcons" alt="chatbot-icon" src="./images/chatbot.png" /></button>
                <button><img className="btnIcons" alt="logout-icon" src="./images/logout.png" /></button>
                </div>
            </div>
        </>
    );
};

export default SideBar;