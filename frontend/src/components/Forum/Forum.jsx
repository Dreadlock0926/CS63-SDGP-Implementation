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

import ForumQuestion from "./ForumQuestion";

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
    let searchParams = "";

    if (down === 1) {
      searchParams = "Pure Mathematics I";
    } else if (down === 2) {
      searchParams = "Probability And Statistics I";
    }

    forumData(searchParams);
  }, [down]); // Added "down" to dependency array to trigger a re-fetch when topic selection changes

  useEffect(() => {
    if (data.length > 0) {
      console.log(data);
    }
  }, [data]);

  const forumData = async (searchParams) => {
    try {
      setLoading(true);

      const response = await Axios.post(EndPoint, {
        searchParams, // Include searchParams in the request body
      });

      setData(response.data);
    } catch (error) {
      console.error("Error fetching forum data:", error);
      setStatus("Error fetching forum data");
    } finally {
      setLoading(false);
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
    <div className="main">
      <div
        style={{ margin: "5%", border: "12px solid #ccc", padding: "20px" }}
        className="container"
      >
        <Typography variant="h4" className="forumTitle">
          Forum
        </Typography>
        <br />
        <br />
        <Typography variant="h4">
          Welcome back, {user.username || user}
        </Typography>
        <br />
        <br />
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
        ) : data.length > 0 ? (
          data.map((x, index) => (
            <div key={index}>
              <ForumQuestion questionData={x} theKey={index} />
            </div>
          ))
        ) : (
          <Typography variant="h5">No questions available</Typography>
        )}
        <Typography>{status}</Typography>
        <Link to="/addforum">Add question to forum? 🤔</Link>
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
