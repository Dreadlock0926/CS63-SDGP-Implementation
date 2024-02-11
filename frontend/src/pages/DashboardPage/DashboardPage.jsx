import "../main.css"
import "./DashboardPage.css"
import ProgressGraph from "../../components/graphs/Progressionmark"

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
                            <div className="course-learn-progress">35%</div>
                            <div className="course-test-progress">55%</div>
                        </div>
                    </div>
                    <div className="course-card">
                        <div className="course-title">Probability and Statistics I</div>
                        <div className="course-lessons">5 lessons</div>
                        <div className="course-progress-tab">
                            <div className="course-learn-progress">25%</div>
                            <div className="course-test-progress">75%</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

// Dashboard Activity Tab
function DashboardActivity() {

    return (
        <>
            <div className="dashboard-activity">
                <h2 className="activity-title">Activity</h2>
                <div className="activity-graph"></div>
            </div>
        </>
    );

}

// Dashboard Final Display Page
function DashboardPage() {

    return (
        <>
        <div className="dashboard-complete-container">
            <DashboardHeader/>
            <div className="dashboard-main">
                <DashboardGraph/>
                <DashboardStatistics/>
                <DashboardCourses/>
                <DashboardActivity/>
            </div>
        </div>
        </>
    );

}

export default DashboardPage;