import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import Axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const PureMath = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function SearchQuestion() {
    try {
      setLoading(true);
      const r = await Axios.get("http://localhost:8000/admins/pure"); //gotta change routes
      setData(r.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    SearchQuestion();
  }, []);

  return (
    <div>
      <p>
        {loading ? (
          <TailSpin></TailSpin>
        ) : data && data.length ? (
          data.map((x, index) => (
            <div key={x._id || index}>
              <MathJaxContext>
                <MathJax>Question :{x.question}</MathJax>
              </MathJaxContext>
              <p>Topic : {x.topic}</p>
              <br></br>
            </div>
          ))
        ) : (
          <h2>No Pure Math Questions found</h2>
        )}
        <Link to="/addpure">Add Pure Maths Questions</Link>
        <br></br>
        <Link to="/">Back to Homepage?</Link>
      </p>
    </div>
  );
};

export default PureMath;
