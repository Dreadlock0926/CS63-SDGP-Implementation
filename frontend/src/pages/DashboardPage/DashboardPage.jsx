/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "../main.css"
import "./DashboardPage.css"
import ProgressGraph from "../../components/graphs/Progressionmark"
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

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
function DashboardStatistics({voxal,ongoingCourses,completeCourses}) {

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
                        <h3 className="tab-header">Hours Learned</h3> {/**This wasn't provided in the data */}
                        <p className="st-num hour-num">23</p>
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

    const {data} = useContext(UserContext)
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
      
      function transformData(data) {
        const transformedData = [
          { subject: 'Pure Mathematics', score: data.PureMathematics },
          { subject: 'Statistics', score: data.Statistics }
        ];
        return transformedData;
      }
  
      setChartData(transformData(data));
    }, [data]); 
  
    return (
        <>
            <div className="dashboard-activity">
                <h2 className="activity-title">Activity</h2>
                <div className="activity-graph"><LineChart width={500} height={300} data={chartData}>
    <XAxis dataKey="name"/>
    <YAxis/>
    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
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

  const {data} = useContext(UserContext)
  console.log(data);


    return (
        <>
        <div className="dashboard-complete-container">
            <DashboardHeader/>
            <div className="dashboard-main">
                <DashboardGraph />
                <DashboardStatistics voxal={data.voxalPoints} ongoingCourses={data.ongoingCourses}  completedCourses={data.completeCourse} />
                <DashboardCourses/>
                <DashboardActivity/>
            </div>
        </div>
        </>
    );

}

export default DashboardPage;