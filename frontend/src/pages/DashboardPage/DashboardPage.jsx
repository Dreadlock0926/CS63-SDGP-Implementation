/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "../main.css";
import "./DashboardPage.css";
import ProgressGraph from "../../components/graphs/Progressionmark";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import Tracking from "../../components/graphs/Tracking";
import NavBar from "../../components/NavigationBar/navBar";


// Dashboard Header Tab
function DashboardHeader() {
  const { data, setData, voxalPoints, setVoxalpoints, setHours, username,setUserName,password,setPassword } = useContext(UserContext);
  const fetchData = async () => {
    try {
      // Replace 'your-api-url' with the actual API URL
      const username1 = localStorage.getItem('username');
      const password1 = localStorage.getItem('password');

     
    
      const response = await axios.post("http://localhost:8000/progression/get",{username1,password1});
      setData(response.data); // Assuming you want to set the response data
      console.log(response.data); // Logging the response data
      let counter = 0;
      let hoursLearned = 0;
      // Extracting voxalPoints using map
      
      setVoxalpoints(response.data.voxalPoints);
      console.log(response.data.voxalPoints)
      setHours(response.data.hoursLearned);
      
    } catch (error) {
      console.error("Error fetching data: ", error);
      // Handle error here, e.g., set an error state
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
function DashboardStatistics() {
  const { voxalPoints, hours, data, setData, course,setCourse,ongoingCourse, setongoingCourses } = useContext(UserContext);
  const username1 = localStorage.getItem('username');
  const password1 = localStorage.getItem('password');

  let incompleteCourse =0;
  let courseCount =0;

  const fetchData = async () => {
    try {
      // Replace 'your-api-url' with the actual API URL
      const response = await axios.post("http://localhost:8000/progression/get",{username1,password1});
      setData(response.data); // Assuming you want to set the response data
      console.log("Completed courses "+response.data.completeCourse); // Logging the response data
      let counter = 0;
      let hoursLearned = 0;
      
      // Extracting voxalPoints using map
     
      
      setCourse(response.data.completeCourse);
      setongoingCourses(response.data.ongoingCourses);
      console.log(response)
      console.log("Completed courses "+course);

      console.log("the points are ", voxalPoints); // Logging the voxalPoints
    } catch (error) {
      console.error("Error fetching data: ", error);
      // Handle error here, e.g., set an error state
    }
  };

  useEffect(() => {
    fetchData();
  }, [password1,username1]);

  return (
    <>
      <div className="dashboard-statistics-container">
        <h2 className="statistics-title">Statistics</h2>
        <div className="statistics-tab">
          <div className="points-tab">
            <h3 className="tab-header">VoXel Points Earned</h3>
            <p className="st-num vox-num">{voxalPoints}</p>
          </div>
          <div className="points-tab">
            <h3 className="tab-header">Hours Learned</h3>
            <p className="st-num hour-num">{hours}</p>
          </div>
          <div className="points-tab">
            <h3 className="tab-header">Ongoing Courses</h3>
            <p className="st-num ongcourses-num">{ongoingCourse}</p>
          </div>
          <div className="points-tab">
            <h3 className="tab-header">Completed Courses</h3>
            <p className="st-num comcourses-num">{course}</p>
          </div>
        </div>
      </div>
    </>
  );
}

// Dashboard Courses Tab
function DashboardCourses() {
  const {
    data,
    setData,
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
  const [mathsLessonMark,setmathsLessonMark] = useState(0);
  const [mathsLesson,setMathsLessons] = useState(0);
  const [statlesson,setStatLessons] = useState(0);

  const username1 = localStorage.getItem('username');
  const password1 = localStorage.getItem('password');

  let PurelearnedProgress = 0;
  
  let StatlearnedProgress = 0;
  let mathsLearning = 0;
  let statisticsLearning = 0;
  let mathlearningTracker = 0;
  let statisticsLearningTracker = 0;

  const fetchData = async () => {
    try {
      // Replace 'your-api-url' with the actual API URL
      const response = await axios.post("http://localhost:8000/progression/get",{username1,password1});
      setData(response.data); // Assuming you want to set the response data
      console.log(response.data); // Logging the response data

      

      setMathsProgress(response.data.PureMathematics.learnedProgress);
      setstatisticsProgress(response.data.Statistics.learnedProgress);
      setstatLessonMark(response.data.Statistics.learnedProgress);
      setmathsLessonMark(response.data.PureMathematics.learnedProgress);
      setMathsLessons(response.data.PureMathematics.lesson);
      setStatLessons(response.data.Statistics.lesson);

      // Extracting voxalPoints using map

      data.map((x) => (PurelearnedProgress += x.PureMathematics));
      setProgress(PurelearnedProgress);

      console.log("the points are ", voxalPoints); // Logging the voxalPoints
    } catch (error) {
      console.error("Error fetching data: ", error);
      // Handle error here, e.g., set an error state
    }
  };

  useEffect(() => {
    fetchData();
  }, [username1,password1]);

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
                  <p className="course-learn-progress">{mathsLessonMark}</p>
                  <p className="prog-bar-text">Learned Progress</p>
                </div>
                <div className="prog-bar">
                  <p className="course-test-progress">{mathsProgress}</p>
                  <p className="prog-bar-text">Tested Progress</p>
                </div>
              </div>
            </div>
            <div className="course-card">
              <div className="course-title">Statistics</div>
              <div className="course-lessons">{statlesson} lessons</div>
              <div className="course-progress-tab">
                <div className="prog-bar">
                  <p className="course-learn-progress">{statLessonMark}</p>
                  <p className="prog-bar-text">Learned Progress</p>
                </div>
                <div className="prog-bar">
                  <p className="course-test-progress">{statisticsProgress}</p>
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

// Dashboard Activity Tab
function DashboardActivity() {
  const { value, setValue } = useContext(UserContext);
  const username1 = localStorage.getItem('username');
  const password1 = localStorage.getItem('password');

  const fetchData = async () => {
    try {
      // Replace 'your-api-url' with the actual API URL
      const response = await axios.post("http://localhost:8000/progression/get",{username1,password1});
      setData(response.data); // Assuming you want to set the response data
      console.log(response.data); // Logging the response data
      let counter = 0;
      let hoursLearned = 0;
      // Extracting voxalPoints using map
      await response.data.map((item) => {
        counter += item.voxalPoints;
      });
      await response.data.map((x) => {
        hoursLearned += x.hoursLearned;
      });
      setVoxalpoints(counter);
      setHours(hoursLearned);
      console.log("the points are ", voxalPoints); // Logging the voxalPoints
    } catch (error) {
      console.error("Error fetching data: ", error);
      // Handle error here, e.g., set an error state
    }
  };

  useEffect(() => {
    fetchData();
  }, [username1,password1]);

  const data = [
    { name: "January", uv: 4000, pv: 2400, amt: 2400 },
    { name: "February", uv: 3000, pv: 1398, amt: 2210 },
    { name: "March", uv: 2000, pv: 9800, amt: 2290 },
    { name: "April", uv: 2780, pv: 3908, amt: 2000 },
    { name: "May", uv: 1890, pv: 4800, amt: 2181 },
    { name: "June", uv: 2390, pv: 3800, amt: 2500 },
    { name: "July", uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <>
      <div className="dashboard-activity">
        <h2 className="activity-title">Activity</h2>
        <div className="activity-graph">
          <LineChart width={500} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
    </>
  );
}

// Dashboard Final Display Page
function DashboardPage() {
  return (
    <>
    <NavBar/>
      <div className="dashboard-complete-container">
        <DashboardHeader />
        <div className="dashboard-main">
          <DashboardGraph />
          <DashboardStatistics />
          <DashboardCourses />
          <DashboardActivity />
          <Tracking/>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
