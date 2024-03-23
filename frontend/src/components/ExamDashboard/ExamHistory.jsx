/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const ExamHistory = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [examHistoryId, setExamHistoryId] = useState({});

  const [feedbackExams, setFeedbackExams] = useState([]);
  const [topicalExams, setTopicalExams] = useState([]);

  const retrieveExamHistory = async () => {
    const response = await Axios.post(
      "http://localhost:8000/exam/getExamHistory",
      {
        userId: "65fd130bc243afb3760aa723",
      }
    );
    if (response.status === 200) {
      setExamHistoryId(response.data);
    }
  };

  const retrieveExamHistoryDetails = async () => {
    const topicalExamsTemp = [];
    const feedbackExamsTemp = [];

    if (examHistoryId.topicalExams.length > 0) {
      for (const exam of examHistoryId.topicalExams) {
        try {
          const response = await Axios.post(
            "http://localhost:8000/exam/getExamHistoryDetails",
            {
              examId: exam,
            }
          );
          topicalExamsTemp.push(response.data);
        } catch (error) {
          console.error("Error fetching topical exam details:", error);
        }
      }
    }

    if (examHistoryId.feedbackExams.length > 0) {
      for (const exam of examHistoryId.feedbackExams) {
        try {
          const response = await Axios.post(
            "http://localhost:8000/exam/getExamHistoryDetails",
            {
              examId: exam,
            }
          );
          feedbackExamsTemp.push(response.data);
        } catch (error) {
          console.error("Error fetching feedback exam details:", error);
        }
      }
    }

    // Update state using the callback to ensure updates after async operations
    setFeedbackExams((prevFeedbackExams) => [
      ...prevFeedbackExams,
      ...feedbackExamsTemp,
    ]);
    setTopicalExams((prevTopicalExams) => [
      ...prevTopicalExams,
      ...topicalExamsTemp,
    ]);
  };

  useEffect(() => {
    setLoggedInUser(
      JSON.parse(sessionStorage.getItem("loggedUser")).data || {}
    );
  }, []);

  useEffect(() => {
    if (Object.keys(loggedInUser).length > 0) {
      retrieveExamHistory();
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (Object.keys(examHistoryId).length > 0) {
      retrieveExamHistoryDetails();
    }
  }, [examHistoryId]);

  useEffect(() => {
    if (feedbackExams.length > 0) {
      console.log(feedbackExams);
    }
  }, [feedbackExams]);

  return (
    <div>
      <h1>Feedback Exams</h1>
      {feedbackExams && feedbackExams.length > 0 ? (
        feedbackExams.map((exam) => {
          return (
            <div key={exam._id}>
              <div>{exam.examModule}</div>
              <Link to={`/exam-review/${exam._id}`}>
                {exam.mark}/{exam.totalMark}
              </Link>
            </div>
          );
        })
      ) : (
        <div>No feedback exams</div>
      )}

      <h1>Topical Exams</h1>
      {topicalExams && topicalExams.length > 0 ? (
        topicalExams.map((exam) => {
          return (
            <div key={exam._id}>
              <div>{exam.examModule}</div>
              <Link to={`/exam-review/${exam._id}`}>
                {exam.mark}/{exam.totalMark}
              </Link>
            </div>
          );
        })
      ) : (
        <div>No topical exams</div>
      )}
    </div>
  );
};

export default ExamHistory;
