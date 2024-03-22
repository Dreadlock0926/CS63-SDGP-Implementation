/* eslint-disable no-unused-vars */
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../App";

const TopicalExam = () => {
  const { topic } = useParams();
  const navigator = useNavigate();
  const { loading, setLoading, BASE } = useContext(UserContext);

  async function ExamCompleted(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const completedExam = await Axios.post(`${BASE}/exam/topicalcompleted`, {
        topic,
      });
      if (completedExam.status === 200) {
        navigator(`/learnprint/${topic}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return loading ? (
    "Loading..."
  ) : (
    <div style={{ textAlign: "center" }}>
      <h1>Topical Exam</h1>
      <h1>{topic ? `The topic is ${topic}` : "No topic selected!"}</h1>
      <button onClick={ExamCompleted}>Done!</button>
    </div>
  );
};

export default TopicalExam;
