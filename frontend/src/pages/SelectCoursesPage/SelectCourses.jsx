import React, { useEffect } from "react";
import { useState, useContext } from "react";
import Axios from "axios";
import { UserContext } from "../../App";
import CourseComponent from "./CourseComponent";

const SelectCourses = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [courses, setCourses] = useState([]);

  const retrieveCourses = async (userCourses) => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/course/getModules",
        {
          courses: userCourses,
        }
      );
      setCourses(response.data);
    } catch (error) {
      console.error(error);
      // Handle errors appropriately, e.g., display an error message to the user
    }
  };
  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedUser")).data);
  }, []);

  useEffect(() => {
    if (Object.keys(loggedInUser).length > 0) {
      console.log(loggedInUser);
      console.log(loggedInUser.courses);
      retrieveCourses(loggedInUser.courses);
    }
  }, [loggedInUser]);
  // Your code here

  return { loggedInUser } ? (
    <div>
      <h1>Select Courses</h1>
      <p>Welcome {loggedInUser.username}</p>
      {courses && courses.length > 0 ? (
        <div>
          <h1>Available Courses</h1>
          {courses.map((course, i) => (
            <CourseComponent course={course} key={i} />
          ))}
        </div>
      ) : (
        <p>Loading Course</p>
      )}
    </div>
  ) : (
    <div>
      <h1>Select Courses</h1>
      <p>Welcome Guest</p>
    </div>
  );
};

export default SelectCourses;
