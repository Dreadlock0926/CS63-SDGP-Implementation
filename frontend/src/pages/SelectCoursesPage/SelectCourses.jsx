/* eslint-disable no-constant-condition */
import React, { useEffect } from "react";
import { useState, useContext } from "react";
import Axios from "axios";
import { UserContext } from "../../App";
import CourseComponent from "./CourseComponent";

const SelectCourses = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const [userStartedCourses, setUserStartedCourses] = useState([]);
  const [userNotStartedCourses, setNotStartedCourses] = useState([]);

  const [lessonProgress, setLessonProgress] = useState([]);

  const initializeProgress = async (sourceKey) => {
    const response = await Axios.post(
      "http://localhost:8000/course/getProgress",
      {
        sourceKey: sourceKey,
        userID: loggedInUser._id,
      }
    );

    setLessonProgress((prevLessonProgress) => [
      ...prevLessonProgress,
      response.data,
    ]);
  };

  const retrieveCourses = async (userCourses) => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/course/getModules",
        {
          courses: userCourses,
        }
      );

      setUserStartedCourses(response.data.userInProgress);
      setNotStartedCourses(response.data.userNotStarted);
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
      const sourceKeys = [];

      loggedInUser.lesson.forEach((lessonProgress) => {
        sourceKeys.push(lessonProgress.source);
      });

      retrieveCourses(sourceKeys);
    }
  }, [loggedInUser]);
  // Your code here

  useEffect(() => {
    if (userStartedCourses.length > 0) {
      userStartedCourses.forEach((course) => {
        initializeProgress(course.sourceKey);
      });
    }
  }, [userStartedCourses]);

  return { loggedInUser } ? (
    <div>
      <h1>Select Courses</h1>
      <p>Welcome {loggedInUser.username}</p>
      {userStartedCourses &&
      lessonProgress.length == userStartedCourses.length ? (
        <div>
          <h1>Courses In Progress</h1>
          {userStartedCourses.length == 0 ? (
            <p>No Courses Started!!</p>
          ) : (
            userStartedCourses.map((course, i) => (
              <div key={i}>
                <CourseComponent
                  course={course}
                  completedFlag={true}
                  progress={{
                    maxLessons: lessonProgress.find(
                      (progress) => progress.sourceKey === course.sourceKey
                    )?.noOfLessonCount,
                    lessonsCompleted: lessonProgress.find(
                      (progress) => progress.sourceKey === course.sourceKey
                    )?.completedLessonCount,
                  }}
                />
              </div>
            ))
          )}
        </div>
      ) : (
        <p>Loading Course</p>
      )}

      {userNotStartedCourses ? (
        <div>
          <h1>Not Started Courses</h1>
          {userNotStartedCourses.length == 0 ? (
            <p>All Courses Started!!</p>
          ) : (
            userNotStartedCourses.map((course, i) => (
              <div key={i}>
                <CourseComponent course={course} completedFlag={false} />
              </div>
            ))
          )}
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
