import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import Axios from "axios";

const AddStat = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    topic: "",
    question: "",
    answer: "",
  });
  const [status, setStatus] = useState("");

  const topicRef = useRef();
  const questionRef = useRef();
  const answerRef = useRef();

  async function AddQuestion(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const r = await Axios.post("http://localhost:8000/admins/pure", data); //gotta change routes
      setData(r.data);
      if (r.status === 200) {
        setStatus("Question Added!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setData({ topic: "", question: "" });
    }
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Add Statistics Questions</h1>
      <form onSubmit={AddQuestion}>
        <input
          ref={topicRef}
          onChange={handleChange}
          name="topic"
          placeholder="Enter topic..."
        ></input>
        <input
          ref={questionRef}
          onChange={handleChange}
          name="question"
          placeholder="Enter Question..."
        ></input>
        <input
          ref={answerRef}
          onChange={handleChange}
          name="answer"
          placeholder="Enter Answer..."
        ></input>
        <button type="submit" disabled={loading}>
          <p>{status ? status : ""}</p>
          {loading ? <TailSpin></TailSpin> : "Add Question"}
        </button>
        <Link to="/">Back to Homepage?</Link>
      </form>
    </div>
  );
};

export default AddStat;
