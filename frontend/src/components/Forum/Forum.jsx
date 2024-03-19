/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { UserContext } from "../../App";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import "./Forum.css";
import All from "./All";
import PureMath from "./PureMath";
import Statistics from "./Statistics";

const Forum = () => {
  const {
    loading,
    setLoading,
    status,
    setStatus,
    logged,
    user,
    searched,
    setSearched,
    transfer,
    setTransfer,
    search,
    setSearch,
    upvoting,
  } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [answer, setAnswer] = useState("");
  const [down, setDown] = useState(0);
  const navigator = useNavigate();

  const [toggle, setToggle] = useState(false);
  const [theTotalUpvotes, setTheTotalUpvotes] = useState(0);
  const EndPoint = "http://localhost:8000/forum";

  useEffect(() => {
    forumData();
  }, [down]); // Added "down" to dependency array to trigger a re-fetch when topic selection changes

  useEffect(() => {
    console.log(data);
  }, [data]);

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
      const response = await Axios.put(`${EndPoint}/upvotes/${id}`, {
        userId: user.id,
      });
      // if (response.data.status === 200) {

      // } else {
      //   setStatus("Error while upvoting");
      // }
      setStatus("Upvoted");
      setData((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, rating: item.rating + 1 } : item
        )
      );
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
      const response = await Axios.put(`${EndPoint}/nerds/${id}`, {
        userID: "65e43aa4a2304a41b4d37e2c",
        theTotalUpvotes,
      });
      if (response.data.status === 200) {
        alert("Nerd points updated!");
        console.log(response.data);
      } else {
        alert("Error while updating!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const downVote = async (id) => {
    try {
      setLoading(true);
      const response = await Axios.put(`${EndPoint}/downvotes/${id}`, {
        userId: user.id,
      });
      if (response.data.status === 200) {
        setStatus("Down Voted");
        setData((prev) =>
          prev.map((x) => (x._id === id ? { rating: x.rating - 1 } : x))
        );
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
      const response = await Axios.put(`${EndPoint}/${id}`, {
        whoAnswered: user.username,
        answer,
      });
      if (response.status === 200) {
        setStatus("Answer Posted");
        setData((prev) =>
          prev.map((x) => {
            if (x.answer === answer && x.whoAnswered === user.username) {
              return { ...x, answer: { ...x.answer, answer: answer } };
            }
            return x;
          })
        );
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
        setData((prev) => prev.filter((comment) => comment._id !== id));
        forumData(); // Assuming this function refreshes the forum data after deleting the comment
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const searchUp = async (e) => {
    e.preventDefault();
    try {
      const theData = await Axios.post(`${EndPoint}/search`, { search });
      // if (theData.data.status === 200) {

      // }
      console.log(` ${theData.data}`);
      setSearched(theData.data);
      console.log(`Searched ${JSON.stringify(searched)}`);
      setTransfer(1);
      navigator("/forumsearch");
    } catch (err) {
      if (err.response.status === 404) {
        setStatus("No results found");
      }
      console.error(err);
    }
  };

  return logged ? (
    <div className="mainContainer">
      <div className="forumContainer">
        <div className="forumHeader">
            <p className="forumTitle">Top Questions</p>
        <p style={{fontSize: "16px"}}>Would you kindly grace us with a question? The button below eagerly awaits your gentle touch, yearning for the opportunity to fulfill its purpose in this vast digital realm.</p>
        <Link className="addQuestionBtn" to="/addforum">Add question</Link>
        <br />
          Welcome back, {user.username || user}!
        </div>
        <form onSubmit={searchUp}>
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search here..."
            type="text"
          ></input>
          <button type="submit" disabled={loading}>
            Search...
          </button>
        </form>
        <FormControl style={{ marginBottom: "20px" }}>
          <InputLabel>Select Topic</InputLabel>
          <br />
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
        <p>{status}</p>
        {loading ? (
          <Typography variant="h5">Loading...</Typography>
        ) : down === 0 ? (
          data && data.length ? (
            data.map((x) => (
              <All
                key={x._id}
                theKey={x._id}
                x={x}
                nerdPointsIncrement={nerdPointsIncrement}
                increaseVotes={increaseVotes}
                downVote={downVote}
                DeleteComment={DeleteComment}
                AnsweringQuestions={AnsweringQuestions}
                answer={answer}
                setAnswer={setAnswer}
                toggle={toggle}
                setToggle={setToggle}
              />
            ))
          ) : (
            "No questions have been posted yet"
          )
        ) : down === 1 ? (
          data && data.length ? (
            data.map((x) =>
              x.topic === "Pure Mathematics I" ? (
                <PureMath
                  key={x._id}
                  x={x}
                  theKey={x._id}
                  nerdPointsIncrement={nerdPointsIncrement}
                  increaseVotes={increaseVotes}
                  downVote={downVote}
                  DeleteComment={DeleteComment}
                  AnsweringQuestions={AnsweringQuestions}
                  answers={answer}
                  setAnswer={setAnswer}
                  toggle={toggle}
                  setToggle={setToggle}
                />
              ) : (
                ""
              )
            )
          ) : (
            "No Pure Math Questions have been posted yet"
          )
        ) : down === 2 ? (
          data && data.length ? (
            data.map((x) =>
              x.topic === "Probability And Statistics" ? (
                <Statistics
                  key={x._id}
                  x={x}
                  theKey={x._id}
                  nerdPointsIncrement={nerdPointsIncrement}
                  increaseVotes={increaseVotes}
                  downVote={downVote}
                  DeleteComment={DeleteComment}
                  AnsweringQuestions={AnsweringQuestions}
                  answer={answer}
                  setAnswer={setAnswer}
                  toggle={toggle}
                  setToggle={setToggle}
                />
              ) : null
            )
          ) : (
            "No statistics questions have been posted yet"
          )
        ) : null}
        <Typography>{status}</Typography>
      </div>
    </div>
  ) : (
    <div>
      <Typography variant="h1">
        Please <Link to="/login">login</Link> to continue to the forum
      </Typography>
    </div>
  );
};

export default Forum;
