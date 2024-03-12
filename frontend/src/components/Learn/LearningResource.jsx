/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";
import { useHover } from "@uidotdev/usehooks";

const LearningResource = () => {
  const { loading, setLoading, status, setStatus } = useContext(UserContext);
  const BASE = "http://localhost:8000/resources/progress/updates";
  const [ref, hovering] = useHover();

  const [counter, setCounter] = useState(0);
  const [theProgressVal, setTheProgressVal] = useState(0);
  const [lessons, setLessons] = useState([]);

  let theProgressGiven = 0;

  async function getNumberOfLessonForProgress() {
    try {
      setLoading(true);
      const { data } = await Axios.get(BASE);
      if (data.status === 200) {
        setLessons(data);
        theProgressGiven =  lessons.topics.length/100;
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
      const { data } = await Axios.post(
        BASE,
        { userId: "65e5ee3fa014a87ba21c66d3" },
        { theProgressVal }
      ); //backend route must increase progress

      if (data.status === 201) {
        alert("Updated Progress");
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
      setCounter((prev) => prev + 1);
      // updateProgress(); //this will be run to update user progress
    }

    console.log(`Your value is ${counter}`);
  }, [hovering]);

  return (
    !loading && (
      <div>
        <h1>learning Resources</h1>
        <div className="end" ref={ref}>
          <h1>The bottom part!</h1>
        </div>
        <p>{counter}</p>
        <h1>{status}</h1>
      </div>
    )
  );
};

export default LearningResource;
