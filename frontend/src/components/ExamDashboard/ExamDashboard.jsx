/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import ExamHistory from "./ExamHistory";
import { UserContext } from "../../App";
import Axios from "axios";
import { Link } from "react-router-dom";
import PastPaperScope from "../../pages/PastPaperPage/pastPaperScope";

const ExamDashboard = () => {
  const { loading, setLoading, BASE } = useContext(UserContext);

  const [loggedInUser, setLoggedInUser] = useState({});

  const [examDashboard, setExamDashboard] = useState({
    feedbackExams: [],
    topicalExams: [],
    pastPapersExams: [],
  });

  async function FetchExamData() {
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/examDashboard/getExams`, {
        userId: loggedInUser._id,
      });
      if (response.status === 200) {
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
    setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedUser")).data);
  }, []);

  useEffect(() => {
    if (Object.keys(loggedInUser).length) {
      FetchExamData();
    }
  }, [loggedInUser]);

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
          </>
        ) : (
          <h1>No results found!</h1>
        )}
      </div>
    </div>
  );
};

export default ExamDashboard;
