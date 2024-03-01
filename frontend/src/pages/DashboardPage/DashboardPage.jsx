/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "../main.css"
import "./DashboardPage.css"
import ProgressGraph from "../../components/graphs/Progressionmark"
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import {CircularProgressbar} from "react-circular-progressbar"
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
function DashboardStatistics({voxal,ongoingCourses,completeCourses,hoursLearned}) {

    return voxal && ongoingCourses && completeCourses && hoursLearned ? (
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
                        <p className="st-num comcourses-num">{completeCourses}</p>
                    </div>
                </div>
            </div>
        </>
    ) : "Some data is hasn't been assigned properly!";

}

// Dashboard Courses Tab
function DashboardCourses() {
    const {
      data,
      setData,
      user,
      setVoxalpoints,
      setHours,
      voxalPoints,
      setProgress,
      progress,
      totalMathsmarks,
      settotalMathsmarks,
    } = useContext(UserContext);
    const [mathsProgress, setMathsProgress] = useState(0);
    const [statisticsProgress, setstatisticsProgress] = useState(0);
    const [statLessonMark, setstatLessonMark] = useState(0);
    const [mathsLessonMark, setmathsLessonMark] = useState(0);
    const [mathsLesson, setMathsLessons] = useState(0);
    const [statlesson, setStatLessons] = useState(0);
  

    let PurelearnedProgress = 0;
  
    let StatlearnedProgress = 0;
    let mathsLearning = 0;
    let statisticsLearning = 0;
    let mathlearningTracker = 0;
    let statisticsLearningTracker = 0;
  
    const fetchData = async () => {
      try {
        // Replace 'your-api-url' with the actual API URL
        const response = await Axios.post(
          "http://localhost:8000/progression/get",
            {username:data.username}
        );
        setData(response.data); // Assuming you want to set the response data
        console.log(`The outcome is ${JSON.stringify(response.data)}`); // Logging the response data
  
        setMathsProgress(response.data.PureMathematics.learnedProgress);
        setstatisticsProgress(response.data.Statistics.learnedProgress);
        setstatLessonMark(response.data.Statistics.learnedProgress);
        setmathsLessonMark(response.data.PureMathematics.learnedProgress);
        setMathsLessons(response.data.PureMathematics.lesson);
        setStatLessons(response.data.Statistics.lesson);
  
    
  
        data.map((x) => (PurelearnedProgress += x.PureMathematics));
        setProgress(PurelearnedProgress);
  
        console.log("the points are ", voxalPoints); // Logging the voxalPoints
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
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
                <div className="course-lessons">{mathsLesson} lessons</div>
                <div className="course-progress-tab">
                  <div className="prog-bar">
                  <div style={{ width: 100, height: 100 }}>
                      <CircularProgressbar value={mathsLessonMark} text={`${mathsLessonMark}%`} />;
                   </div> 
                    <p className="prog-bar-text">Learned Progress</p>
                  </div>
                  <div className="prog-bar">
                  <div style={{ width: 100, height: 100 }}>
                      <CircularProgressbar value={mathsProgress} text={`${mathsProgress}%`} />;
                  </div>
                    <p className="prog-bar-text">Tested Progress</p>
                  </div>
                </div>
              </div>
              <div className="course-card">
                <div className="course-title">Statistics</div>
                <div className="course-lessons">{statlesson} lessons</div>
                <div className="course-progress-tab">
                  <div className="prog-bar">
                  <div style={{ width: 100, height: 100 }}>
                      <CircularProgressbar value={statLessonMark} text={`${statLessonMark}%`} />;
                  </div>
                    <p className="prog-bar-text">Learned Progress</p>
                  </div>
                  <div className="prog-bar">
                  <div style={{ width: 100, height: 100 }}>
                    <CircularProgressbar value={statisticsProgress} text={`${statisticsProgress}%`} />;
                  </div>
                    <p className="prog-bar-text">Tested Progress</p>
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

    const transformedData = [
        { subject: 'Pure Mathematics', score: data.PureMathematics[0] },
        { subject: 'Statistics', score: data.Statistics[0] }
    ];

    return (
        <div className="dashboard-activity">
            <h2 className="activity-title">Activity</h2>
            <div className="activity-graph">
                <LineChart width={500} height={300} data={transformedData}>
                    <XAxis dataKey="subject"/>
                    <YAxis/>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                    <Line type="monotone" dataKey="score" stroke="#8884d8" />
                </LineChart>
            </div>
        </div>
    );
    }




// Dashboard Final Display Page
function DashboardPage() {

  const {data, isAuthenticated, user} = useContext(UserContext)
  console.log(data);


    return  isAuthenticated && user?  (
        <>
        <div className="dashboard-complete-container">
            <DashboardHeader/>
            <div className="dashboard-main">
                <DashboardGraph />
                <DashboardStatistics voxal={data.voxalPoints} ongoingCourses={data.ongoingCourses}  completedCourses={data.completeCourse} hoursLearned={data.hoursLearned} />
                <DashboardCourses />
                <DashboardActivity/>
            </div>
        </div>
        </>
    ) : "Please login to continue!";

}

export default DashboardPage;