import React from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "../../App";

const Courses = () => {
  // Your code here
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    if (sessionStorage.getItem("loggedUser")) {
      setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedUser")));
    } else {
      alert("Please login to access this page");
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    console.log(loggedInUser);
  }, [loggedInUser]);

  return <div>courses</div>;
};

export default Courses;
