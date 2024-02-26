/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { Button, FormControl, Input, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import "./Forum.css";

const Forum = () => {
  const { loading, setLoading, status, setStatus, logged, user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [answer, setAnswer] = useState("");
  const [votes, setVotes] = useState(0);
  const [down, setDown] = useState(0);
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
      const upvote = await Axios.put(`${EndPoint}/upvotes/${id}`);
      if (upvote.status === 200) {
        setStatus("Upvoted!");
        window.location.reload();
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

  const downVote = async (id) => {
    try {
      setLoading(true);
      const downvote = await Axios.put(`${EndPoint}/downvotes/${id}`);
      if (downvote.status === 200) {
        setStatus("Down Voted!");
        window.location.reload();
      } else {
        setStatus("Error while downvoting!");
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
      const response = await Axios.put(`${EndPoint}/${id}`, { answer });
      if (response.data.status === 200) {
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

  useEffect(() => {
    console.log(down);
  }, [down]);

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (toggle) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  }, [toggle]);
  
  return logged ? (
    <div style={{margin:"5%"}}>
            <Typography variant="h4" style={{textAlign:"center",margin:"5%",fontSize:48}}>Forum</Typography>
            <button onClick={()=>{setToggle(!toggle)}}>{toggle? "☀️" : "🌙"}</button>
      <Typography variant="h4">Welcome back, {user.username || user}!</Typography>
      <br />
      <FormControl>
        <InputLabel>Select Topic</InputLabel>
        <Select
          value={down}
          onChange={(e) => setDown(Number(e.target.value))}
        >
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={1}>Pure Math</MenuItem>
          <MenuItem value={2}>Statistics</MenuItem>
        </Select>
      </FormControl>
      {loading ? (
        <Typography variant="h5">Loading...</Typography>
      ) : data && data.length && down === 0 ? (
        data.map((x) => (
          <div key={x._id}>
            <br />
            <Typography variant="h4">{x.question}</Typography>
            <Typography variant="body1">{x.description}</Typography>
            <Typography variant="h4">{x?.answer ? `${x.answer}` : "Be the first to Answer! 🥳"}</Typography>
            <Typography variant="body2">{x.by ? `Posted by ${x.by}` : ""}</Typography>
            <Typography variant="body2">{x.rating ? `Upvoted by ${x.rating}` : <Typography variant="h4">Rated by none!</Typography>}</Typography>
            <Button onClick={(e) => { e.preventDefault(); increaseVotes(x._id) }}>Upvote!</Button>
            <Button onClick={(e) => { e.preventDefault(); downVote(x._id) }}>DownVote!</Button>
            <Button onClick={(e) => { e.preventDefault(); DeleteComment(x._id) }}>Delete</Button>
            <br />
            <form className="replyForm" onSubmit={(e) => { e.preventDefault(); AnsweringQuestions(x._id, answer) }}>
              <Input onChange={(e) => { setAnswer(e.target.value) }} placeholder="Answer..." type="text" />
              <Button type="submit">Answer!</Button>
            </form>
            <br />
          </div>
        ))
      ) : data && data.length && down === 1 ? (
        data.map((x) => (
          x.topic === "Pure Mathematics I" ? (
           
            <div key={x._id}>
              <br />
              <Typography variant="h2">{x.topic}</Typography>
              <Typography variant="body2">{x.description}</Typography>
              <Typography variant="h4">{x.question}</Typography>
              <Typography variant="h4">{x?.answer ? `${x.answer}\n` : "Be the first to Answer! 🥳"}</Typography>
              <Typography variant="body2">{x.by ? `Posted by ${x.by}` : ""}</Typography>
              <Typography variant="body2">{x.rating ? `Upvoted by ${x.rating}` : <Typography variant="h4">Rated by none!</Typography>}</Typography>
              <Button onClick={(e) => { e.preventDefault(); increaseVotes(x._id) }}>Upvote!</Button>
              <Button onClick={(e) => { e.preventDefault(); downVote(x._id) }}>DownVote!</Button>
              <Button onClick={(e) => { e.preventDefault(); DeleteComment(x._id) }}>Delete</Button>
              <br />
              <form onSubmit={(e) => { e.preventDefault(); AnsweringQuestions(x._id, answer) }}>
                <Input onChange={(e) => { setAnswer(e.target.value) }} placeholder="Answer..." type="text" />
                <Button type="submit">Answer!</Button>
              </form>
              <br />
            </div>
          ) : null
        ))
      ) : data && data.length && down === 2 ? (
        data.map((x) => (
          x.topic === "Probability And Statistics" ? (
            <div key={x._id}>
              <br />
              <Typography variant="h2">{x.topic}</Typography>
              <Typography variant="body2">{x.description}</Typography>
              <Typography variant="h4">{x.question}</Typography>
              <Typography variant="h4">{x?.answer ? x.answer : "Be the first to Answer! 🥳"}</Typography>
              <Typography variant="body2">{x.by ? `Posted by ${x.by}` : ""}</Typography>
              <Typography variant="body2">{x.rating ? `Upvoted by ${x.rating}` : <Typography variant="h4">Rated by none!</Typography>}</Typography>
              <Button onClick={(e) => { e.preventDefault(); increaseVotes(x._id) }}>Upvote!</Button>
              <Button onClick={(e) => { e.preventDefault(); downVote(x._id) }}>DownVote!</Button>
              <Button onClick={(e) => { e.preventDefault(); DeleteComment(x._id) }}>Delete</Button>
              <br />
              <form onSubmit={(e) => { e.preventDefault(); AnsweringQuestions(x._id, answer) }}>
                <Input onChange={(e) => { setAnswer(e.target.value) }} placeholder="Answer..." type="text" />
                <Button type="submit">Answer!</Button>
              </form>
              <br />
            </div>
          ) : null
        ))
      ) : null}
      <Typography>{status}</Typography>
      <Link to="/addforum">Add question to forum? 🤔</Link>
    </div>
  ) : (
    <div>
      <Typography variant="h1">Please <Link to="/login">login</Link> to continue to the forum </Typography>
    </div>
  );
}

export default Forum;
