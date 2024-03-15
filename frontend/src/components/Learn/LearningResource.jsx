/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";
import { useHover } from "@uidotdev/usehooks";
import { Link, useParams } from "react-router-dom";


const LearningResource = (props) => {
  const {
    loading,
    setLoading,
    status,
    setStatus,
    user,
    theProgressVal,
    setTheProgressVal,
  } = useContext(UserContext);
  const BASE = "http://localhost:8000/resources/progress/updates";
  const [ref, hovering] = useHover();
  const [lessons, setLessons] = useState([]);
  const { index } = useParams();

  let theProgressGiven = 0;
  async function getNumberOfLessonForProgress() {
    try {
      setLoading(true);
      const { data } = await Axios.get(BASE, { userId: user.id });
      if (data.status === 200) {
        setLessons(data);
        if (theProgressVal !== "") {
          setTheProgressVal("");
        }
        theProgressGiven = data.topics.length / 100;
        console.log(theProgressGiven);
        setTheProgressVal(theProgressGiven); //global state
      } else if (data.status === 404) {
        setStatus("No results found!");
      } else {
        setStatus("Error while processing data!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateProgress() {
    try {
      setLoading(true);
      const { data } = await Axios.post(BASE, {
        userId: user.id,
        theProgressVal,
      });
      if (data.status === 201) {
        setStatus("Updated Progress");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getNumberOfLessonForProgress();
  }, []);

  useEffect(() => {
    if (hovering) {
      alert("Hovering")
      setTheProgressVal((prev) => (prev += theProgressGiven));
      updateProgress();
      JSON.stringify(lessons);
    }
  }, [hovering]);

  async function CompletedLesson() {
    try {
      setTheProgressVal((prev) => (prev += theProgressGiven));
      updateProgress();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ height: "4000px" }}>
      <h1>Learning Resources</h1>
      {/* <div className="end" ref={ref}>
          <h1>The end!</h1>
        </div> */}

      <p>Your index {index ? index : "Nothing!"}</p>
      <Link to={`/nextpage/${1}`} onClick={CompletedLesson}>
        Next Page!
      </Link>
      <h1>Status {status ? status : "No status"}</h1>
      <p>Progress {theProgressVal ? theProgressVal : "No progress"}</p>
      <div className="end" ref={ref} >The End!</div>
    </div>
  );
};

export default LearningResource;
