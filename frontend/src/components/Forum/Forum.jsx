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
  const [toggle, setToggle] = useState(false);
  const [down,setDown]  =useState(0)
  const navigator = useNavigate();
  const EndPoint = "http://localhost:8000/forum";
  let nerdPoints = 0;

  useEffect(() => {
    forumData();
  }, []);

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
      const response = await Axios.put(`${EndPoint}/upvotes/${id}`,{userId:user.id});
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

  const downVote = async (id) => {
    try {
      setLoading(true);
      const response = await Axios.put(`${EndPoint}/downvotes/${id}`,{userId:user.id});
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
      const response = await Axios.put(`${EndPoint}/${id}`, { answer });
      if (response.data.status === 200) {
        setStatus("Answer Posted");
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
        navigator("/forum");
      } 
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

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
    <div className="main">    <div style={{ margin: "5%",border:"12px" }} className="container">
    <Typography variant="h4"  className="forumTitle">Forum</Typography>
    <br/>
    <button onClick={() => { setToggle(!toggle) }}>{toggle ? "☀️" : "🌙"}</button>
    <Typography variant="h4">Welcome back, {user.username || user}</Typography>
    <br/>
    <br />
    <FormControl >
      <InputLabel >Select Topic</InputLabel>
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
          <div key={x._id} className="card">
            <br />
            <Typography variant="h4">{x.question}</Typography>
            <Typography variant="body1">{x.description}</Typography>
            <Typography variant="h4">
                    {x?.answer ? (
                      <div>
                        <h2>Responses</h2>
                        {x.answer.map((answer, index) => (
                          <div key={index} style={{marginBottom:"1%"}}>
                            <h1>{answer}</h1>
                            <button onClick={()=>{nerdPoints+=5;alert(`Given user ${nerdPoints}!`)}}>Give Points!</button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      "Be the first to Answer 🥳"
                    )}
                  </Typography>
            <Typography variant="body2">{x.by ? `Posted by ${x.by}` : ""}</Typography>
            <Typography variant="body2">{x.rating ? `Upvoted by ${x.rating}` : <Typography variant="h4">Rated by none</Typography>}</Typography>
            <Button onClick={(e) => { e.preventDefault(); increaseVotes(x._id) }}>Upvote</Button>
            <Button onClick={(e) => { e.preventDefault(); downVote(x._id) }}>DownVote</Button>
            <Button onClick={(e) => { e.preventDefault(); DeleteComment(x._id) }}>Delete</Button>
            <br />
            <form className="replyForm" onSubmit={(e) => { e.preventDefault(); AnsweringQuestions(x._id, answer) }}>
              <Input onChange={(e) => { setAnswer(e.target.value) }} placeholder="Answer..." type="text" />
              <Button type="submit">Answer</Button>
            </form>
            <br />
          </div>
        ))
        : `No questions have been posted yet`
    ) : down === 1 ? (
      data && data.length ?
        data.map((x) => (
          x.topic === "Pure Mathematics I" ? (
            <div key={x._id} className="card">
              <br />
              <Typography variant="h2">{x.topic}</Typography>
              <Typography variant="body2">{x.description}</Typography>
              <Typography variant="h4">{x.question}</Typography>
              <Typography variant="h4">
                    {x?.answer ? (
                      <div>
                        <h2>Responses</h2>
                        {x.answer.map((answer, index) => (
                          <div key={index} style={{marginBottom:"1%"}}>
                            <h1>{answer}</h1>
                            <button onClick={()=>{nerdPoints+=5;alert(`Given user ${nerdPoints}!`)}}>Give Points!</button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      "Be the first to Answer 🥳"
                    )}
                  </Typography>
              <Typography variant="body2">{x.by ? `Posted by ${x.by}` : ""}</Typography>
              <Typography variant="body2">{x.rating ? `Upvoted by ${x.rating}` : <Typography variant="h4">Rated by none</Typography>}</Typography>
              <Button onClick={(e) => { e.preventDefault(); increaseVotes(x._id) }}>Upvote</Button>
              <Button onClick={(e) => { e.preventDefault(); downVote(x._id) }}>DownVote</Button>
              <Button onClick={(e) => { e.preventDefault(); DeleteComment(x._id) }}>Delete</Button>
              <br />
              <form onSubmit={(e) => { e.preventDefault(); AnsweringQuestions(x._id, answer) }}>
                <Input onChange={(e) => { setAnswer(e.target.value) }} placeholder="Answer..." type="text" />
                <Button type="submit">Answer</Button>
              </form>
              <br />
            </div>
          ) : null
        ))
        : "No Pure Math Questions have been posted yet"
    ) : down === 2 ? (
      data && data.length ?
        data.map((x) => (
          x.topic === "Probability And Statistics" ? (
            <div key={x._id} className="card">
              <br />
              <Typography variant="h2">{x.topic}</Typography>
              <Typography variant="body2">{x.description}</Typography>
              <Typography variant="h4">{x.question}</Typography>
              <Typography variant="h4">
                    {x?.answer ? (
                      <div>
                        <h2>Responses</h2>
                        {x.answer.map((answer, index) => (
                          <div key={index} style={{marginBottom:"1%"}}>
                            <h1>{answer}</h1>
                            <button onClick={()=>{nerdPoints+=5;alert(`Given user ${nerdPoints}!`)}}>Give Points!</button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      "Be the first to Answer 🥳"
                    )}
                  </Typography>
              <Typography variant="body2">{x.by ? `Posted by ${x.by}` : ""}</Typography>
              <Typography variant="body2">{x.rating ? `Upvoted by ${x.rating}` : <Typography variant="h4">Rated by none</Typography>}</Typography>
              <Button onClick={(e) => { e.preventDefault(); increaseVotes(x._id) }}>Upvote</Button>
              <Button onClick={(e) => { e.preventDefault(); downVote(x._id) }}>DownVote</Button>
              <Button onClick={(e) => { e.preventDefault(); DeleteComment(x._id) }}>Delete</Button>
              <br />
              <form onSubmit={(e) => { e.preventDefault(); AnsweringQuestions(x._id, answer) }}>
                <Input onChange={(e) => { setAnswer(e.target.value) }} placeholder="Answer..." type="text" />
                <Button type="submit">Answer</Button>
              </form>
              <br />
            </div>
          ) : null
        ))
        : "No statistics questions have been posted yet"
    ) : null}
    <Typography>{status}</Typography>
    <Link to="/addforum">Add question to forum? 🤔</Link>
  </div></div>
  ) : (
      <div>
        <Typography variant="h1">Please <Link to="/login">login</Link> to continue to the forum </Typography>
      </div>
    );
  }

export default Forum;
