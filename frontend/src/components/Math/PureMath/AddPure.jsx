import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import Axios from "axios";

const AddPure = () => {
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

      const response = await Axios.post(
        "http://localhost:8000/admins/pure",  //gotta change routes
        data
      );

      if (response.status === 200) {
        setStatus("Question Added");
      }
    } catch (err) {
      console.error("Error adding question:", err);
    } finally {
      setLoading(false);

      setData({ topic: "", question: "" });
    }
  }

  return (
    <div>
      <h1>Add Pure Maths Questions</h1>
      <form onSubmit={AddQuestion}>
        <input
          ref={topicRef}
          value={data.topic}
          onChange={(e) => {
            setData({ ...data, topic: e.target.value });
          }}
          placeholder="Enter topic..."
        ></input>
        <input
          ref={questionRef}
          value={data.question}
          onChange={(e) => {
            setData({ ...data, question: e.target.value });
          }}
          placeholder="Enter Question..."
        ></input>
        <input
          ref={answerRef}
          onChange={(e) => {
            setData({ ...data, answer: e.target.value });
          }}
          placeholder="Enter Answer..."
        ></input>
        <button type="submit" disabled={loading}>
          <p>{status}</p>
          {loading ? <TailSpin></TailSpin> : "Add Question"}
        </button>
        <Link to="/">Back to Homepage?</Link>
      </form>
    </div>
  );
};

export default AddPure;
