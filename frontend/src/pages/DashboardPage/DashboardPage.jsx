/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "../main.css";
import "./DashboardPage.css";
import ProgressGraph from "../../components/graphs/Progressionmark";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { CircularProgressbar } from "react-circular-progressbar";
import Axios from "axios";

// Dashboard Header Tab
function DashboardHeader() {
  return (
    <>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="profile-corner">
          <div className="notification-tab"></div>
          <div className="profile-icon"></div>
        </div>
      </div>
    </>
  );
}

// Dashboard Graph Tab
function DashboardGraph() {
  return (
    <>
      <div className="dashboard-graph-container">
        <h2 className="graph-title">Progress</h2>
        <div className="graph">
          <ProgressGraph />
        </div>
      </div>
    </>
  );
}

// Dashboard Statistics Tab
function DashboardStatistics({
  voxal,
  ongoingCourses,
  completedCourses,
  hoursLearned,
}) {
  return (
    <>
      <div className="dashboard-statistics-container">
        <h2 className="statistics-title">Statistics</h2>
        <div className="statistics-tab">
          <div className="points-tab">
            <h3 className="tab-header">VoXel Points Earned</h3>
            <p className="st-num vox-num">{voxal}</p>
          </div>
          <div className="points-tab">
            <h3 className="tab-header">Hours Learned</h3>
            <p className="st-num hour-num">{hoursLearned}</p>
          </div>
          <div className="points-tab">
            <h3 className="tab-header">Ongoing Courses</h3>
            <p className="st-num ongcourses-num">{ongoingCourses}</p>
          </div>
          <div className="points-tab">
            <h3 className="tab-header">Completed Courses</h3>
            <p className="st-num comcourses-num">{completedCourses}</p>
          </div>
        </div>
      </div>
    </>
  );
}

// Dashboard Courses Tab
function DashboardCourses() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedUser")).data);
  }, []);

  useEffect(() => {
    console.log(loggedInUser);
  }, [loggedInUser]);

  const {
    statLearnedProgress,
    pureMathLearnedProgress,
    mathLesson,
    statlLesson,
    testedPureProgress,
    testedStatProgress,
  } = useContext(UserContext);

  return (
    <>
      {/* {data && data.length ? data.map((course) => (
            
          )) : <h1>No results found!</h1>} */}
      <div>
        <div className="dashboard-courses">
          <h2 className="courses-header">My Courses</h2>
          <div className="courses-tab">
            <div className="course-card">
              <div className="course-title">Pure Mathematics I</div>
              <div className="course-lessons">
                {loggedInUser.PureMathematics.lesson} lessons
              </div>
              <div className="course-progress-tab">
                <div className="prog-bar">
                  <div style={{ width: 100, height: 100 }}>
                    <CircularProgressbar
                      value={loggedInUser.PureMathematics.learnedProgress}
                      text={`${loggedInUser.PureMathematics.learnedProgress}%`}
                      styles={{
                        path: {
                          stroke: `rgba(62, 152, 199, ${
                            loggedInUser.PureMathematics.learnedProgress / 100
                          })`,
                        },
                      }}
                    />
                  </div>
                  <p className="prog-bar-text">Learned Progress</p>
                </div>
                <div className="prog-bar">
                  <div style={{ width: 100, height: 100 }}>
                    <CircularProgressbar
                      value={loggedInUser.PureMathematics.testedProgress}
                      text={`${loggedInUser.PureMathematics.testedProgress}%`}
                      styles={{
                        path: {
                          stroke: `rgba(62, 152, 199, ${
                            loggedInUser.PureMathematics.testedProgress / 100
                          })`,
                        },
                        // Customize the text color and style as needed
                      }}
                    />
                  </div>
                  <p className="prog-bar-text">Tested Progress</p>
                </div>
              </div>
            </div>
            <div className="course-card">
              <div className="course-title">Statistics</div>
              <div className="course-lessons">
                {loggedInUser.Statistics.learnedProgress} lessons
              </div>
              <div className="course-progress-tab">
                <div className="prog-bar">
                  <div style={{ width: 100, height: 100 }}>
                    <CircularProgressbar
                      value={loggedInUser.Statistics.learnedProgress}
                      text={`${loggedInUser.Statistics.learnedProgress}%`}
                      styles={{
                        path: {
                          stroke: `rgba(62, 152, 199, ${
                            loggedInUser.Statistics.learnedProgress / 100
                          })`,
                        },
                        // Customize the text color and style as needed
                      }}
                    />
                  </div>
                  <p className="prog-bar-text">Learned Progress</p>
                </div>
                <div className="prog-bar">
                  <div style={{ width: 100, height: 100 }}>
                    <CircularProgressbar
                      value={loggedInUser.Statistics.testedProgress}
                      text={`${loggedInUser.Statistics.testedProgress}%`}
                      styles={{
                        path: {
                          stroke: `rgba(62, 152, 199, ${
                            loggedInUser.Statistics.testedProgress / 100
                          })`,
                        },
                        // Customize the text color and style as needed
                      }}
                    />
                    <p className="prog-bar-text">Tested Progress</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function DashboardActivity() {
  const { data } = useContext(UserContext);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  // Check if data is null before accessing its properties
  const transformedData = loggedInUser
    ? [
        {
          subject: "Pure Mathematics",
          score: loggedInUser.PureMathematics?.score ?? 0,
        },
        { subject: "Statistics", score: loggedInUser.Statistics?.score ?? 0 },
      ]
    : [];

  return (
    <div className="dashboard-activity">
      <h2 className="activity-title">Activity</h2>
      <div className="activity-graph">
        <LineChart width={500} height={300} data={transformedData}>
          <XAxis dataKey="subject" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="score" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
}

// Dashboard Final Display Page
function DashboardPage() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const {
    loading,
    setLoading: setLoading,
    value,
    setValue: setValue,
    data,
    setData,
    voxalPoints,
    setVoxalpoints,
    hours,
    setHours,
    progress,
    setProgress,
    statValue,
    setstatValue,
    course,
    setCourse,
    ongoingCourse,
    setongoingCourses,

    setUser,
    hoursLearned,
    setHoursLearned,
    completeCourse,
    setCompleteCourse,
    statLearnedProgress,
    setStatLearnedProgress,
    pureMathLearnedProgress,
    setPureMathLearnedProgress,
    mathLesson,
    setMathLesson,
    statlLesson,
    setStatLesson,
    status,
    setStatus,
    testedPureProgress,
    setPureTestedProgress,
    testedStatProgress,
    setStatTestedProgress,
    isAuthenticated,
  } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setVoxalpoints(loggedInUser.voxalPoints);
        setHoursLearned(loggedInUser.hoursLearned);
        setCompleteCourse(loggedInUser.completeCourse);
        setongoingCourses(loggedInUser.ongoingCourses);
        setPureMathLearnedProgress(
          loggedInUser.PureMathematics.learnedProgress
        );
        setStatLearnedProgress(loggedInUser.Statistics.learnedProgress);
        setMathLesson(loggedInUser.PureMathematics.lesson);
        setStatLesson(loggedInUser.Statistics.lesson);
        setPureTestedProgress(loggedInUser.PureMathematics.testedProgress);
        setStatTestedProgress(loggedInUser.Statistics.testedProgress);

        console.log(loggedInUser.voxalPoints);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

  fetchData();




  return (
    <>
      <div className="dashboard-complete-container">
        <DashboardHeader />
        <div className="dashboard-main">
          <DashboardGraph />
          <DashboardStatistics
            voxal={loggedInUser.voxalPoints}
            ongoingCourses={loggedInUser.ongoingCourses}
            completedCourses={loggedInUser.completeCourse}
            hoursLearned={loggedInUser.hoursLearned}
          />
          <DashboardCourses />
          <DashboardActivity />
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
