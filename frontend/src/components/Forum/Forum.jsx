/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./Forum.css";

const Forum = () => {
  const { loading, setLoading, status, setStatus, logged, user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [answer, setAnswer] = useState("");
  const [votes, setVotes] = useState(0);
  const navigator = useNavigate();
  const EndPoint = "http://localhost:8000/forum";
  
  useEffect(() => {
    forumData();
  }, []);

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

  const increaseVotes = async (id) => {
    try {
      setLoading(true);
      let totalVotes = 0;
      data.forEach((x) => {
        totalVotes += x.rating;
      });
      totalVotes++;
      const upvote = await Axios.put(`${EndPoint}/upvotes/${id}`, { votes: totalVotes });
      if (upvote.status === 200) {
        setVotes(totalVotes);
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

  const AnsweringQuestions = async (id, answer) => {
    try {
      setLoading(true);
      const r = await Axios.put(`${EndPoint}/${id}`, { answer });
      if (r.data.status === 200) {
        setStatus("Answer Posted!");
        setTimeout(() => {
          navigator("/forum");
        }, 2000);
      }
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
        navigator("/forum");
      } else {
        alert("Couldn't delete question!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return logged ? (
    <div>
      <h1>Welcome back {user.username || user}!</h1>
      <h1>Forum!</h1>
      <br />
      <Link to="/pureforum">Visit Pure Maths Forum!</Link>
      <br />
      <Link to="/statforum">Visit Statistics Forum!</Link>
      {loading ? (
        <h1>Loading...</h1>
      ) : data && data.length ? (
        data.map((x) => (
          <div key={x._id}>
            <br />
            <br />
            <h1>{x.question}</h1>
            <h1>{x?.answer ? x.answer : "Be the first to Answer! 🥳"}</h1>
            <p>{x.by ? `Posted by ${x.by}` : ""}</p>
            <p>{x.rating ? `Upvoted by ${x.rating}` : <h1>Rated by none!</h1>}</p>
            <button onClick={(e) => { e.preventDefault(); increaseVotes(x._id) }}>Upvote!</button>
            <button onClick={(e) => { e.preventDefault(); DeleteComment(x._id) }}>Delete</button>
            <br />
            <form onSubmit={(e) => { e.preventDefault(); AnsweringQuestions(x._id, answer) }}>
              <input onChange={(e) => { setAnswer(e.target.value) }} placeholder="Answer..." type="text" />
              <button type="submit">Answer!</button>
            </form>
            <br />
            <p>{status}</p>
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

export default Forum;
