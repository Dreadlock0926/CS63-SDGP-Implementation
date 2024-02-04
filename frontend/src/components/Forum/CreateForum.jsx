import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const CreateForum = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);

  const EndPoint = "http://localhost:8000/forum";

  async function AddQuestion(e) {
    e.preventDefault();
    try {
      if (status !== "") {
        setStatus("");
      }
      setLoading(true);
      const r = await Axios.post(EndPoint, question);

      if (r.status === 200) {
        setStatus("Question Added");
        setTimeout(()=>{
          navigator("/forum")
        },2000)
      } else if (r.status === 409) {
        setStatus("Question already exists!");
      } else {
        setStatus("Error while adding question!");
      }

    
    } catch (err) {
      setStatus("Error Occured, please try again");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function AnsweringQuestions(id) {
   
    try {
      setLoading(true);
      const r = await Axios.post(`${EndPoint}/${id}`, answer);
      if (r.data.status === 200) {
        setStatus("Answer Posted!");
      }

      setTimeout(() => {
        navigator("/forum");
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function GetQuestions() {
    if (status !== "") {
      setStatus("");
    }
    try {
      setLoading(true);
      const r = await Axios.get(EndPoint);
      setData(r.data);
    } catch (err) {
      setStatus("Error Occured while fetching data!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    GetQuestions();
  });

  return (
    <div className="container-fluid">
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <form onSubmit={AddQuestion}>
            <input
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
              placeholder="Enter your question"
              type="text"
            ></input>
            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Add Question"}
            </button>
            {status}
          </form>
          <div>
            {data && data.length ? (
              data.map((x, index) => (
                <div key={x._id || index}>
                  <h1>{x.question}</h1>
                  <br></br>
                  <form style={{margin:'5%'}} onSubmit={(e)=>{
                    e.preventDefault();
            AnsweringQuestions(x._id)
          }}>
            <input
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
            ></input>
          </form>
                </div>
              ))
            ) : (
              <h1>No questions available</h1>
            )}
          </div>

          <Link to="/forum">Forum Page</Link>
        </div>
      )}
    </div>
  );
};

export default CreateForum;
