/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";
import { useHover } from "@uidotdev/usehooks";

const LearningResource = () => {
  const { loading, setLoading, status, setStatus, user } =
    useContext(UserContext);
  const BASE = "http://localhost:8000/resources/progress/updates";
  const [ref, hovering] = useHover();
  const [theProgressVal, setTheProgressVal] = useState(0);
  const [lessons, setLessons] = useState([]);

  let theProgressGiven = 0;
  async function getNumberOfLessonForProgress() {
    try {
      setLoading(true);
      const { data } = await Axios.get(BASE, { userId: user.id });
      if (data.status === 200) {
        setLessons(data);
        theProgressGiven = data.topics.length / 100;
        console.log(theProgressGiven);
        setTheProgressVal(theProgressGiven);
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
      alert("Hovering!");
      setTheProgressVal((prev) => (prev += theProgressGiven));
      updateProgress();
      JSON.stringify(lessons);
    }
  }, [hovering]);

  return (
    !loading && (
      <div>
        <h1>Learning Resources</h1>
        <div className="end" ref={ref}>
          <h1>The end!</h1>
        </div>
        <h1>{status}</h1>
        <p>{theProgressVal}</p>
      </div>
    )
  );
};

export default LearningResource;
