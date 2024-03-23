/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import ExamHistory from "./ExamHistory";
import { UserContext } from "../../App";
import Axios from "axios";
import { Link } from "react-router-dom";
import PastPaperScope from "../../pages/PastPaperPage/pastPaperScope";
import FeedbackPage from "../../pages/FeedbackPage/FeedbackPage";
import updateLoggedUser from "../../pages/SelectCoursesPage/updateLoggedUser";

const ExamDashboard = () => {
  const { BASE } = useContext(UserContext);

  const [loading, setLoading] = useState(true);

  const [loggedInUser, setLoggedInUser] = useState({});
  const [userId, setUserId] = useState("");

  const [examDashboard, setExamDashboard] = useState({
    feedbackExams: [],
    topicalExams: [],
    pastPapersExams: [],
  });

  async function FetchExamData() {
    try {
      const response = await Axios.post(`${BASE}/examDashboard/getExams`, {
        userId: loggedInUser._id,
      });
      if (response.status === 200) {
        console.log(response.data);
        setExamDashboard(response.data);
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert("Error!");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setUserId(JSON.parse(sessionStorage.getItem("loggedUser")).data._id);
  }, []);

  useEffect(() => {
    if (userId) {
      updateLoggedUser(userId).then(() => {
        setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedUser")).data);
      });
    }
  }, [userId]);

  useEffect(() => {
    if (Object.keys(loggedInUser).length) {
      FetchExamData();
    }
  }, [loggedInUser]);

  useEffect(() => {
    console.log(examDashboard);
  }, [examDashboard]);

  return loading ? (
    <h1 style={{ textAlign: "center", margin: "20px", padding: "10px" }}>
      Loading...
    </h1>
  ) : (
    <div style={{ margin: "20px", textAlign: "center" }}>
      <h1>Exam Dashboard</h1>

      <div style={{ margin: "20px" }}>
        {examDashboard.feedbackExams.length ||
        examDashboard.topicalExams.length ||
        examDashboard.pastPapersExams.length ? (
          <>
            <div
              className="feedback"
              style={{ margin: "20px", padding: "20px" }}
            >
              <h1>{`Feedback`}</h1>
              {examDashboard.feedbackExams.map((x) => (
                <div
                  key={x._id}
                  className="card"
                  style={{ marginBottom: "20px" }}
                >
                  <p>{`${Math.round(
                    (x.mark / x.totalMark) * 100
                  )}% Completed`}</p>
                  <Link
                    to={`/exam-review/${x._id}`}
                  >{`Start ${x.examType} Exam!`}</Link>
                </div>
              ))}
            </div>
            <div
              className="topical"
              style={{ margin: "20px", padding: "20px" }}
            >
              <h1>{`Topical Exams!`}</h1>
              <div
                className="card-container"
                style={{ display: "flex", flexDirection: "row" }}
              >
                {examDashboard.topicalExams.map((x) => (
                  <div
                    key={x._id}
                    className="card"
                    style={{ marginRight: "20px" }}
                  >
                    <p>{`${Math.round(
                      (x.mark / x.totalMark) * 100
                    )}% Completed`}</p>
                    <Link
                      to={`/exam-review/${x._id}`}
                    >{`Start ${x.examType} Exam!`}</Link>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="pastpaperex"
              style={{ margin: "20px", padding: "20px" }}
            >
              <h1>{`Past Papers`}</h1>
              {examDashboard.pastPapersExams.map((x) => (
                <div
                  key={x._id}
                  className="card"
                  style={{ marginBottom: "20px" }}
                >
                  <p>{`${Math.round(
                    (x.mark / x.totalMark) * 100
                  )}% Completed`}</p>
                  <Link
                    to={`/exam-review/${x._id}`}
                  >{`Start ${x.examType} Exam!`}</Link>
                </div>
              ))}
            </div>
            <PastPaperScope />
            <div>
              <h1>Start Feedback Exam</h1>
              <FeedbackPage />
            </div>
          </>
        ) : (
          <h1>No results found!</h1>
        )}
      </div>
    </div>
  );
};

export default ExamDashboard;
