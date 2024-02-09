/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { UserContext } from "../../App";

const CreateForum = () => {
  const {log} = useContext(UserContext)
  const [user,setUser] = useState({question:"",topic:"",subtopic:""})


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
      const r = await Axios.post(EndPoint, user);

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

  // async function GetQuestions() {
  //   if (status !== "") {
  //     setStatus("");
  //   }
  //   try {
  //     setLoading(true);
  //     const r = await Axios.get(EndPoint);
  //     setData(r.data);
  //   } catch (err) {
  //     setStatus("Error Occured while fetching data!");
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   GetQuestions(); //small issue getting questions back!
  // });

  const handleChange = (e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }

  return log? <div className="container-fluid">
  {loading ? (
    "Loading..."
  ) : (
    <div>
      <form onSubmit={AddQuestion}>
        <input
          onChange={handleChange}
          name="question"
          placeholder="Enter your question"
          type="text"
          required
        ></input>
          <input
          onChange={handleChange}
          name="topic"
          placeholder="Enter your topic"
          type="text"
          required
        ></input>
          <input
          onChange={handleChange}
          name="subtopic"
          placeholder="Enter your subtopic"
          type="text"
          required
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
        AnsweringQuestions(x._id) //to answer questions!
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
</div>:<h1>Please <Link to="/login">Login</Link> to continue!</h1>
};

export default CreateForum;
