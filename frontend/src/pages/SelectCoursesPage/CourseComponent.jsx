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
