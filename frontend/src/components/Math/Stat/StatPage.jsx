import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import Axios from "axios";

const StatPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function SearchQuestion() {
    try {
      setLoading(true);
      const response = await Axios.get("http://localhost:8000/admins/stat"); //gotta change routes
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    SearchQuestion();
  }, []);

  return (
    <div>
      <br></br>
      {loading ? (
        <TailSpin></TailSpin>
      ) : data && data.length ? (
        data.map((x, index) => (
          <div key={x._id || index}>
            <br></br>
            <MathJaxContext>
              <MathJax>{x.question}</MathJax>
            </MathJaxContext>
            <p>Topic : {x.topic}</p>
            <br />
            <br></br>
          </div>
        ))
      ) : (
        <h2>No Statistics Questions Added!</h2>
      )}
      <Link to="/addstat">Add Statistics Questions</Link>
      <br></br>
      <Link to="/">Back to Homepage?</Link>
    </div>
  );
};

export default StatPage;
