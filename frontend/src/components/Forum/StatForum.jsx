/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { FidgetSpinner } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./Forum.css";

const StatForum = () => {
  const { loading, setLoading, status, setStatus, logged, user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [answer, setAnswer] = useState("");

  const EndPoint = "http://localhost:8000/forum";

  const increaseVotes = async (id) => {
    try {
      setLoading(true);
      const response = await Axios.put(`${EndPoint}/upvotes/${id}`);
      if (response.data.status === 200) {
        setStatus("Upvoted!");
      } else {
        setStatus("Error while upvoting!");
      }
      setTimeout(() => {
        navigator("/forum");
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const forumData = async () => {
    try {
      setLoading(true);
      const response = await Axios.get(EndPoint);
      setData(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const AnsweringQuestions = async (id) => {
    try {
      setLoading(true);
      const response = await Axios.put(`${EndPoint}/${id}`, { answer });
      if (response.data.status === 200) {
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
  };

  const DeleteComment = async (id) => {
    try {
      const deleteRequest = await Axios.delete(`${EndPoint}/${id}`);
      if (deleteRequest.status === 200) {
        alert("Deleted Question!");
      } else {
        alert("Couldn't delete question!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    forumData();
  }, []);

  return logged ? (
    <div>
    <h1>Welcome back {user.username || user}!</h1>
      <h1>Statistics Forum!</h1>
      {loading ? (
        <FidgetSpinner />
      ) : data && data.length ? (
        data.map((x) => (
          <div key={x._id}>
            {x.topic === "Probability And Statistics" && (
              <div>
                <br />
                <br />
                <h1>{x.question}</h1>
                <h1>{x?.answer ? x.answer : "Be the first to Answer! 🥳"}</h1>
                <p>{x.by ? `Posted by ${x.by}` : ""}</p>
                <p>{x.rating ? `Upvoted by ${x.rating}` : <h1>Rated by none!</h1>}</p>
                <button onClick={(e) => { e.preventDefault(); increaseVotes(x._id) }}>Upvote!</button>
                <button onClick={(e) => { e.preventDefault(); DeleteComment(x._id) }}>Delete</button>
                <br />
                <form onSubmit={(e) => { e.preventDefault(); AnsweringQuestions(x._id) }}>
                  <input onChange={(e) => { setAnswer(e.target.value) }} value={answer} placeholder="Answer..." type="text" />
                  <button type="submit">Answer!</button>
                </form>
              </div>
            )}
          </div>
        ))
      ) : (
        <h1>No forum questions added yet!</h1>
      )}
      <Link to="/addforum">Add question to forum? 🤔</Link>
    </div>
  ) : (
    <div><h1>Please <Link to="/login">login</Link> to continue to the forum </h1></div>
  );
};

export default StatForum;
