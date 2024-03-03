/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { UserContext } from "../../App";
import { Button, FormControl, Input, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import "./Forum.css";

const Forum = () => {
  const { loading, setLoading, status, setStatus, logged, user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [answer, setAnswer] = useState("");
  const [down, setDown] = useState(0);
  const navigator = useNavigate();
  const EndPoint = "http://localhost:8000/forum";

  useEffect(() => {
    forumData();
  }, [down]); // Added "down" to dependency array to trigger a re-fetch when topic selection changes

  const forumData = async () => {
    try {
      setLoading(true);
      const response = await Axios.get(EndPoint);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching forum data:", error);
      setStatus("Error fetching forum data");
    } finally {
      setLoading(false);
    }
  };

  const increaseVotes = async (id) => {
    try {
      setLoading(true);
      const response = await Axios.put(`${EndPoint}/upvotes/${id}`, { userId: user.id });
      if (response.data.status === 200) {
        setStatus("Upvoted");
        setData(prevData => prevData.map(item => item._id === id ? { ...item, rating: item.rating + 1 } : item));
      } else {
        setStatus("Error while upvoting");
      }
      setTimeout(() => {
        navigator("/forum");
      }, 2000);
    } catch (error) {
      console.error("Error while upvoting:", error);
    } finally {
      setLoading(false);
    }
  };

  const nerdPointsIncrement = async (id) => {
    try {
      const response = await Axios.put(`${EndPoint}/nerds/${id}`, { userID: user.id });
      if(response.status===200){
           alert("Nerd points updated!");
      }else{
        alert("Error while updating!")
      }
   
    } catch (err) {
      console.error(err);
    }
  };

  const downVote = async (id) => {
    try {
      setLoading(true);
      const response = await Axios.put(`${EndPoint}/downvotes/${id}`, { userId: user.id });
      if (response.data.status === 200) {
        setStatus("Down Voted");
      } else {
        setStatus("Error while downvoting");
      }
      setTimeout(() => {
        navigator("/forum");
      }, 2000);
    } catch (error) {
      console.error("Error while downvoting:", error);
    } finally {
      setLoading(false);
    }
  };

  const AnsweringQuestions = async (id, answer) => {
    try {
      setLoading(true);
      const response = await Axios.put(`${EndPoint}/${id}`, { whoAnswered: user.username, answer });
      if (response.status === 200) {
        setStatus("Answer Posted");
        forumData();
      }
    } catch (error) {
      console.error("Error posting answer:", error);
    } finally {
      setLoading(false);
    }
  };

  const DeleteComment = async (id) => {
    try {
      const response = await Axios.delete(`${EndPoint}/${id}`);
      if (response.status === 200) {
        alert("Deleted Question");
        // Refetch data after deleting comment
        forumData();
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return logged ? (
    <div className="main"> 
      <div style={{ margin: "5%", border: "12px solid #ccc", padding: "20px" }} className="container">
        <Typography variant="h4" className="forumTitle">Forum</Typography>
        <br/><br/>
        <Typography variant="h4">Welcome back, {user.username || user}</Typography>
        <br/>
        <br />
        <FormControl style={{ marginBottom: "20px" }}>
          <InputLabel>Select Topic</InputLabel>
          <br/>
          <Select
            className="theDrop"
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
        ) : down === 0 ? (
          data && data.length ?
            data.map((x) => (
              <div key={x._id} className="card" style={{ marginBottom: "20px" }}>
                <Typography variant="h4">{x.question}</Typography>
                <Typography variant="body1">{x.description}</Typography>
                <Typography variant="h4">Responses:</Typography>
                {x?.answers && x.answers.length ? (
                  x.answers.map((answer, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                      <Typography variant="h6">{answer.text}</Typography>
                      <Typography variant="body1">Posted By: {answer.answeredBy}</Typography>
                      <Button onClick={() => nerdPointsIncrement(x._id)} variant="contained" color="primary">
                        Give Points!
                      </Button>
                    </div>
                  ))
                ) : (
                  <Typography variant="h6">Be the first to Answer 🥳</Typography>
                )}
                <Typography variant="body2">{x.by ? `Posted by ${x.by}` : ""}</Typography>
                <Typography variant="body2">{x.rating ? `Upvoted by ${x.rating}` : "Rated by none"}</Typography>
                <Button onClick={() => increaseVotes(x._id)}>Upvote</Button>
                <Button onClick={() => downVote(x._id)}>DownVote</Button>
                <Button onClick={() => DeleteComment(x._id)}>Delete</Button>
                <form className="replyForm" onSubmit={(e) => { e.preventDefault(); AnsweringQuestions(x._id, answer) }}>
                  <Input onChange={(e) => setAnswer(e.target.value)} placeholder="Answer..." type="text" />
                  <Button type="submit">Answer</Button>
                </form>
              </div>
            ))
            : "No questions have been posted yet"
        ) : down === 1 ? (
          data && data.length ?
            data.map((x) => (
              x.topic === "Pure Mathematics I" ? (
                <div key={x._id} className="card" style={{ marginBottom: "20px" }}>
                  <Typography variant="h4">{x.topic}</Typography>
                  <Typography variant="body2">{x.description}</Typography>
                  <Typography variant="h4">{x.question}</Typography>
                  {x?.answer ? (
                    x.answer.map((answer, index) => (
                      <div key={index} style={{ marginBottom: "10px" }}>
                        <Typography variant="h6">{answer}</Typography>
                        <Button onClick={() => nerdPointsIncrement(x._id)}>Give Points!</Button>
                      </div>
                    ))
                  ) : (
                    <Typography variant="h6">Be the first to Answer 🥳</Typography>
                  )}
                  <Typography variant="body2">{x.by ? `Posted by ${x.by}` : ""}</Typography>
                  <Typography variant="body2">{x.rating ? `Upvoted by ${x.rating}` : "Rated by none"}</Typography>
                  <Button onClick={() => increaseVotes(x._id)}>Upvote</Button>
                  <Button onClick={() => downVote(x._id)}>DownVote</Button>
                  <Button onClick={() => DeleteComment(x._id)}>Delete</Button>
                  <form onSubmit={(e) => { e.preventDefault(); AnsweringQuestions(x._id, answer) }}>
                    <Input onChange={(e) => { setAnswer(e.target.value) }} placeholder="Answer..." type="text" />
                    <Button type="submit">Answer</Button>
                  </form>
                </div>
              ) : null
            ))
            : "No Pure Math Questions have been posted yet"
        ) : down === 2 ? (
          data && data.length ?
            data.map((x) => (
              x.topic === "Probability And Statistics" ? (
                <div key={x._id} className="card" style={{ marginBottom: "20px" }}>
                  <Typography variant="h4">{x.topic}</Typography>
                  <Typography variant="body2">{x.description}</Typography>
                  <Typography variant="h4">{x.question}</Typography>
                  {x?.answer ? (
                    x.answer.map((answer, index) => (
                      <div key={index} style={{ marginBottom: "10px" }}>
                        <Typography variant="h6">{answer}</Typography>
                        <Button onClick={() => nerdPointsIncrement(x._id)}>Give Points!</Button>
                      </div>
                    ))
                  ) : (
                    <Typography variant="h6">Be the first to Answer 🥳</Typography>
                  )}
                  <Typography variant="body2">{x.by ? `Posted by ${x.by}` : ""}</Typography>
                  <Typography variant="body2">{x.rating ? `Upvoted by ${x.rating}` : "Rated by none"}</Typography>
                  <Button onClick={() => increaseVotes(x._id)}>Upvote</Button>
                  <Button onClick={() => downVote(x._id)}>DownVote</Button>
                  <Button onClick={() => DeleteComment(x._id)}>Delete</Button>
                  <form onSubmit={(e) => { e.preventDefault(); AnsweringQuestions(x._id, answer) }}>
                    <Input onChange={(e) => { setAnswer(e.target.value) }} placeholder="Answer..." type="text" />
                    <Button type="submit">Answer</Button>
                  </form>
                </div>
              ) : null
            ))
            : "No statistics questions have been posted yet"
        ) : null}
        <Typography>{status}</Typography>
        <Link to="/addforum">Add question to forum? 🤔</Link>
      </div>
    </div>
  ) : (
    <div>
      <Typography variant="h1">Please <Link to="/login">login</Link> to continue to the forum </Typography>
    </div>
  );
}

export default Forum;
