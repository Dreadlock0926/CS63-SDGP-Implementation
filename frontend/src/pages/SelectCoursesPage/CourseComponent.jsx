import React from "react";
import "./CourseComponent.css";
import initializeProbabilities from "../FeedbackPage/initializeProbabilities";
import updateLoggedUser from "./updateLoggedUser";
import updateCourses from "./updateCourses";
import Axios from "axios";
import { Link } from "react-router-dom";

const handleClick = async (courseRef, courseKey) => {
  let loggedInUser = JSON.parse(sessionStorage.getItem("loggedUser")).data;

  try {
    await updateCourses(loggedInUser._id, courseRef, courseKey).then(
      async (result) => {
        console.log(result);
      }
    );

    // await updateLoggedUser(loggedInUser._id).then(async (result) => {
    //   console.log(result);
    //   sessionStorage.setItem("loggedUser", JSON.stringify({ data: result }));

    //   console.log(sessionStorage.getItem("loggedUser"));

    //   loggedInUser = result;

    //   await initializeProbabilities(loggedInUser).then((result) => {
    //     console.log(result);

    // async function updateModuleProbability() {
    //   await Axios.post(
    //     "http://localhost:8000/user/updateModuleProbabilities",
    //     {
    //       username: loggedInUser.username,
    //       topicProbabilities: result,
    //     }
    //   )
    //     .then(function (response) {
    //       console.log(response);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // }

    // updateModuleProbability();
    // });

    // window.location.href = "/select-course";
    // });
  } catch (error) {
    console.error(error);
  }
};

const CourseComponent = (course) => {
  return (
    <div className="courseContainer">
      <h2>{course.course.source}</h2>
      <div className="topicsContainer">
        <ul className="topicTagField">
          {course.course.topics.map((topic, i) => (
            <Link to={topic} key={i}>
              <li key={i}>{topic}</li>
            </Link>
          ))}
        </ul>
      </div>
      <button
        onClick={async () => {
          handleClick(course.course._id, course.course.sourceKey);
        }}
      >
        Start Course
      </button>
    </div>
  );
};

export default CourseComponent;
