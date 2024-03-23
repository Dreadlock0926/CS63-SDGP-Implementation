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
import "react-circular-progressbar/dist/styles.css";
import Axios from "axios";
import axios from "axios";
import Progressionmark from "../../components/graphs/Progressionmark";
import { Link } from "react-router-dom";

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
          <Progressionmark />
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
  const { loggedInUser, setLoggedInUser, examHistory, setExamHistory } =
    useContext(UserContext);
  const {
    statLearnedProgress,
    pureMathLearnedProgress,
    mathLesson,
    statlLesson,
    testedPureProgress,
    testedStatProgress,
    setPureTestedProgress,
    setStatTestedProgress,
    pureLessonCount,
    statLessonCount,
    statisticsMarks,
    setStatisticsMarks,
    mathematicsMarks,
    setMathematicsMarks,
    totalMathsmarks,
    setTotalMathsmark,
    totalStatMarks,
    setTotalStatMarks,
  } = useContext(UserContext);

  useEffect(() => {
    setExamHistory(loggedInUser.data);
  }, [loggedInUser]);

  useEffect(() => {
    let tempStatisticsMarks = [];
    let totaltempStatMarks = [];
    let tempMathematicsMarks = [];
    let totaltempMathsMarks = [];
    if (Array.isArray(examHistory)) {
      examHistory.forEach((exam) => {
        // Changed '.foreach' to '.forEach'
        if (exam.examModule === "Probability & Statistics I") {
          tempStatisticsMarks.push(exam.mark);
          totaltempStatMarks.push(exam.totalMark);
        } else if (exam.examModule === "Pure Mathematics I") {
          tempMathematicsMarks.push(exam.mark);
          totaltempMathsMarks.push(exam.totalMark);
        }
      });
      setMathematicsMarks(tempMathematicsMarks);
      setStatisticsMarks(tempStatisticsMarks);
      setTotalMathsmark(totaltempMathsMarks);
      setTotalStatMarks(totaltempStatMarks);
    }
  }, [examHistory]);

  useEffect(() => {
    console.log("logged in user:");
    console.log(loggedInUser);
  }, [loggedInUser]);

  useEffect(() => {
    const correcttotalStatmarks = statisticsMarks.reduce(
      (acc, current) => acc + current,
      0
    );
    const totalStatmark = totalStatMarks.reduce(
      (acc, current) => acc + current,
      0
    );

    const correcttotalPuremaths = mathematicsMarks.reduce(
      (acc, current) => acc + current,
      0
    );
    const totalPureMaths = totalMathsmarks.reduce(
      (acc, current) => acc + current,
      0
    );

    const averageStatMarks = Math.round(
      (correcttotalStatmarks / totalStatmark) * 100,
      2
    );
    const averagePureMarks = Math.round(
      (correcttotalPuremaths / totalPureMaths) * 100,
      2
    );

    console.log(averagePureMarks);
    console.log(averageStatMarks);

    setStatTestedProgress(averageStatMarks);
    setPureTestedProgress(averagePureMarks);
  }, [statisticsMarks, totalStatMarks, mathematicsMarks, totalMathsmarks]);

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
              <div className="course-lessons">{mathLesson} lessons</div>
              <div className="course-progress-tab">
                <div className="prog-bar">
                  <div style={{ width: 100, height: 100 }}>
                    <CircularProgressbar
                      value={pureLessonCount}
                      text={`${pureLessonCount}%`}
                      styles={{
                        path: {
                          // Use the progress percentage to determine the opacity
                          stroke: `rgba(62, 152, 199, ${
                            pureLessonCount / 100
                          })`,
                        },
                        text: {
                          // Adjust text color as needed
                          fill: "#f88",
                        },
                      }}
                    />
                  </div>
                  <p className="prog-bar-text">Learned Progress</p>
                </div>
                <div className="prog-bar">
                  <div style={{ width: 100, height: 100 }}>
                    <CircularProgressbar
                      value={testedPureProgress}
                      text={`${testedPureProgress}`}
                      styles={{
                        path: {
                          // Use the progress percentage to determine the opacity
                          stroke: `rgba(62, 152, 199, ${
                            testedPureProgress / 100
                          })`,
                        },
                        text: {
                          // Adjust text color as needed
                          fill: "#f88",
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
              <div className="course-lessons">{statlLesson} lessons</div>
              <div className="course-progress-tab">
                <div className="prog-bar">
                  <div style={{ width: 100, height: 100 }}>
                    <CircularProgressbar
                      value={statLessonCount}
                      text={`${statLessonCount}%`}
                      styles={{
                        path: {
                          stroke: `rgba(62, 152, 199, ${
                            statLessonCount / 100
                          })`,
                        },
                        text: {
                          // Adjust text color as needed
                          fill: "rgba(62, 152, 199)",
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
                      value={testedStatProgress}
                      text={`${testedStatProgress}`}
                      styles={{
                        path: {
                          stroke: `rgba(62, 152, 199, ${
                            testedStatProgress / 100
                          })`,
                        },
                        text: {
                          // Adjust text color as needed
                          fill: "rgba(62, 152, 199)",
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
          score: 15,
        },
        { subject: "Statistics", score: 60 },
      ]
    : [];

  return (
    loggedInUser && (
      <div className="dashboard-activity">
        <h2 className="activity-title">Activity</h2>
        <div className="activity-graph">
          <p>The graph</p>
          <Link
            to={`/exam-review/${transformedData.map((x) => {
              return x.score;
            })}`}
          >
            <LineChart width={500} height={300} data={transformedData}>
              <XAxis dataKey="subject" />
              <YAxis />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="score" stroke="#8884d8" />
            </LineChart>
          </Link>
        </div>
      </div>
    )
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
    user,
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
    userId,
    setUserId,
    pureLessonCount,
    setPureLessonCount,
    statLessonCount,
    setStatLessonCount,
  } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(data);
        const sessionData = sessionStorage.getItem("loggedUser");
        if (sessionData) {
          const sessionUser = JSON.parse(sessionData).data;
          console.log(sessionUser.lesson.length);

          setVoxalpoints(sessionUser.voxelPoints);
          setHoursLearned(0); // Make sure to compute the correct value
          setCompleteCourse(sessionUser.lesson.length)

          if (sessionUser.lesson && sessionUser.lesson.length > 0) {
            setPureMathLearnedProgress(sessionUser.lesson[0].topicLesson);
            setStatLearnedProgress(sessionUser.lesson[1].topicLesson);
          } else {
            // Handle the case where lesson is not an array or is empty
            setPureMathLearnedProgress(null);
          }
          console.log("Voxel Points:", sessionUser.voxelPoints);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(pureMathLearnedProgress);
    if (Array.isArray(pureMathLearnedProgress)) {
      // Assuming pureMathLearnedProgress is the array of topicLessons as seen in your screenshot
      const totalCount = pureMathLearnedProgress.reduce((total, topic) => {
        // Count the completed lessons within this topic's lessonProgress
        const completedCount = topic.lessonProgress.filter(
          (lesson) => lesson.completed
        ).length;
        // Add this topic's completed count to the total count
        return total + completedCount;
      }, 0); // Start with a total count of 0
      setMathLesson(totalCount);

      const totaNumber = pureMathLearnedProgress.reduce((total, topic) => {
        const totalCount = topic.lessonProgress.length + total;
        return totalCount;
      }, 0);

      const percentage = Math.round((totalCount / totaNumber) * 100, 2);
      console.log("The total number is" + percentage);
      setPureLessonCount(percentage);
    }
  }, [pureMathLearnedProgress]);

  ////for statistics

  useEffect(() => {
    if (Array.isArray(statLearnedProgress)) {
      const totalCount = statLearnedProgress.reduce((total, topic) => {
        const completeCount = topic.lessonProgress.filter(
          (lesson) => lesson.completed
        ).length;
        return total + completeCount;
      }, 0);

      setStatLesson(totalCount);
      const totalNumber = statLearnedProgress.reduce((total, topic) => {
        const totalCount = topic.lessonProgress.length + total;
        return totalCount;
      }, 0);
      const percentage = Math.round((totalCount / totalNumber) * 100, 2);
      setStatLessonCount(percentage);
    }
  }, [statLearnedProgress]);

  const id = localStorage.getItem("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/progression/get/hours",
          { _id: id }
        );
        if (response) {
          setHoursLearned(response.data.hours);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [hoursLearned]);

  return (
    <>
      <div className="dashboard-complete-container">
        <DashboardHeader />
        <div className="dashboard-main">
          <DashboardGraph />
          <DashboardStatistics
            voxal={voxalPoints}
            ongoingCourses={ongoingCourse}
            completedCourses={completeCourse}
            hoursLearned={hoursLearned}
          />
          <DashboardCourses />
          <DashboardActivity />
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
