/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { FetchMaterial } from "../Api/Api";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import NotLogged from "../NotLogged";
import {ProgressBar} from "react-loader-spinner"
import "./Learn.css";
import Axios from "axios";

const Learn = () => {
  const {
    loggedInUser,
    setLoggedInUser,
    loading,
    logged,
    theTopic,
    setTheTopic,
  } = useContext(UserContext);

  const [startedModule, setStartedModule] = useState([]);

  const fetchStartedModule = async () => {
    try {
      const response = await Axios.post(
        `http://localhost:8000/resources/getStartedCourses`,
        {
          userId: loggedInUser._id,
        }
      );

      console.log(response.data);
      setStartedModule(response.data.startedCourses);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    // console.log(sessionStorage.getItem("loggedUser"));
    setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedUser")).data);
  }, []);

  useEffect(() => {
    if (Object.keys(loggedInUser).length > 0) {
      console.log(loggedInUser);
      fetchStartedModule();
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (startedModule.length > 0) {
      console.log(startedModule);
    }
  }, [startedModule]);

  return Object.keys(loggedInUser).length > 0 &&  (
    loading? <ProgressBar/> :
    <div className="learn-container">
      <header className="header">
        <h1>Learning Resources</h1>
      </header>
      <div className="subjects-container">
        {startedModule.length > 0 ? (
          startedModule.map((course, index) => (

            <Link
              to={
                course === "Pure Mathematics I"
                  ? `/learnprint/p1`
                  : course === "Probability and Statistics I"
                  ? `/learnprint/s1`
                  : null
              }
              key={index}
              className="subject-link"
              onClick={() => {
                // if (course === "Pure Mathematics I") {
                //   setTheTopic("Pure");
                // } else if (course === "Probability and Statistics I") {
                //   setTheTopic("Stat");
                // }
                console.log(course);
              }}
            >
              <h3>{course}</h3>
            </Link>
          ))
        ) : (
          <h2>No courses started yet!</h2>
        )}
      </div>
    </div>
  ) 
};

export default Learn;
