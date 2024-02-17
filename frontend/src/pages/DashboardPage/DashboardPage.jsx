/* eslint-disable no-unused-vars */
import "../main.css";
import "./DashboardPage.css";
import ProgressGraph from "../../components/graphs/Progressionmark";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import axios from "axios";

// Dashboard Header Tab
function DashboardHeader() {
  const [data, setData] = useState(null);
  const [voxalPoints, setVoxalpoints] = useState(0);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'your-api-url' with the actual API URL
        const response = await axios.get(
          "http://localhost:8000/progression/get"
        );
        setData(response);
        console.log(data);
        const points = data.reduce((acc, item) => acc + item.voxalPoints, 0);
        setVoxalpoints(points);
        console.log("the points are "+voxalPoints);
      } catch (error) {
        console.error("Error fetching data: ", error);
        // Handle error here, e.g., set an error state
      }
    };

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
  return (
    <>
      <div className="dashboard-statistics-container">
        <h2 className="statistics-title">Statistics</h2>
        <div className="statistics-tab">
          <div className="points-tab">
            <h3 className="tab-header">VoXel Points Earned</h3>
            <p className="st-num vox-num">150</p>
          </div>
          <div className="points-tab">
            <h3 className="tab-header">Hours Learned</h3>
            <p className="st-num hour-num">23</p>
          </div>
          <div className="points-tab">
            <h3 className="tab-header">Ongoing Courses</h3>
            <p className="st-num ongcourses-num">1</p>
          </div>
          <div className="points-tab">
            <h3 className="tab-header">Completed Courses</h3>
            <p className="st-num comcourses-num">2</p>
          </div>
        </div>
      </div>
    </>
  );
}

// Dashboard Courses Tab
function DashboardCourses() {
  return (
    <>
      <div className="dashboard-courses">
        <h2 className="courses-header">My Courses</h2>
        <div className="courses-tab">
          <div className="course-card">
            <div className="course-title">Pure Mathematics I</div>
            <div className="course-lessons">12 lessons</div>
            <div className="course-progress-tab">
              <div className="prog-bar">
                <p className=" course-learn-progress">35%</p>
                <p className="prog-bar-text">Learned Progress</p>
              </div>
              <div className="prog-bar">
                <p className="course-test-progress">55%</p>
                <p className="prog-bar-text">Tested Progress</p>
              </div>
            </div>
          </div>
          <div className="course-card">
            <div className="course-title">Probability and Statistics I</div>
            <div className="course-lessons">5 lessons</div>
            <div className="course-progress-tab">
              <div className="prog-bar">
                <p className="course-learn-progress">25%</p>
                <p className="prog-bar-text">Learned Progress</p>
              </div>
              <div className="prog-bar">
                <p className="course-test-progress">85%</p>
                <p className="prog-bar-text">Tested Progress</p>
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
      <div className="dashboard-complete-container">
        <DashboardHeader />
        <div className="dashboard-main">
          <DashboardGraph />
          <DashboardStatistics />
          <DashboardCourses />
          <DashboardActivity />
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
