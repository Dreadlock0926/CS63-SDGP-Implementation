/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState, useNavigate } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import Axios from "axios";
import { useHover } from "@uidotdev/usehooks";

const TopicalExam = () => {
  const [hoverRef, isHovering] = useHover();
  const {
    topicRelated,
    setTopicRelated,
    BASE,
    theProgressVal,
    setLessons,
    setLoading,
    loading,
    TheSource,
    setTheProgressVal,
    user,
    theTopic,
  } = useContext(UserContext);
  const { lesson } = useParams();
  const [answer, setAnswer] = useState("");
  const [theQuestions,setTheQuestions] = useState({})
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setAnswer({ [e.target.name]: e.target.value });
  };

  async function DoExam() {}

  useEffect(() => {
    DoExam();
  }, [lesson]);

  return loading && lesson ? (
    "Loading..."
  ) : (
    <div>
      <h1>Welcome to the topical exam of {lesson}</h1>
      <div className="questions">
        <p>1. This is the first question in {lesson}</p>
        <input
          onChange={handleChange}
          name="answer"
          placeholder="Enter Your Answer..."
          type="text"
        ></input>
        <button>Answer</button>
      </div>
    </div>
  );
};

export default TopicalExam;
