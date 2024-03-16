import { Link } from "react-router-dom";

const NotLogged = () => {
  return (
    <>
      Click <Link to="/login">Here</Link> to Login!
    </> //to show the "Click here to login" part for every route easier access
  );
};

export default NotLogged;
