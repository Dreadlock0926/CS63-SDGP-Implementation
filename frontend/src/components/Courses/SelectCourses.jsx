import React from "react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const Courses = () => {
  // Your code here
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedUser")).data);

    setCourses(loggedInUser.progress.courses);
  }, []);

  useEffect(() => {
    console.log(loggedInUser);
  }, [loggedInUser]);

  return courses.length > 0 ? (
    <>{courses}</>
  ) : (
    // (alert("Please login to access this page"),
    // (window.location.href = "/login"))

    "Loading courses..."
  );
};

export default Courses;
