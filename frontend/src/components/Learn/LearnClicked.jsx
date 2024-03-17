/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState, useNavigate } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import Axios from "axios";
import { useHover } from "@uidotdev/usehooks";

const LearnClicked = () => {
  const [hoverRef, isHovering] = useHover();
  const {
    topicRelated,
    setTopicRelated,
    BASE,
    theProgressVal,
    setLessons,
    setLoading,
    setTheProgressVal,
    user,
    lessonCounter,
    setLessonCounter,
    theTopic,
  } = useContext(UserContext);
  const { lesson } = useParams();
  const [status, setStatus] = useState("");

  useEffect(()=>{
    console.log(JSON.stringify(lesson));
  },[lesson])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await Axios.post(`${BASE}/resources/false-topic`, {
          userId: "65f584b5794ca9565c2dc26a",
          topic: lesson,
          source: "p1",
        });
        console.log(response.data);
        setTopicRelated(response.data);
        setStatus("");
      } catch (error) {
        console.error(error.message);
        setStatus(error.response.status);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lesson]); // Fetch data when lesson changes

  useEffect(() => {
    const getNumberOfLessonForProgress = async () => {
      try {
        setLoading(true);
        const { data } = await Axios.get(BASE, { userId: user.id });
        if (data.status === 200) {
          setLessons(data);
          setTheProgressVal(data.topics.length / 100);
        }
      } catch (error) {
        console.error(error);
        setStatus(
          error.response
            ? error.response.status
            : "Error while processing data!"
        );
      } finally {
        setLoading(false);
      }
    };

    getNumberOfLessonForProgress();
  }, []); // Fetch data once on component mount

  const IncrementProgress = async () => {
    try {
      const outcome = await Axios.put(`${BASE}/resources/progress/updates`, {
        userId: "65f2a146a0acea296a663650",
        topicRelated, //user.id
      });
      setLessonCounter((prev) => prev + 1);
      if (outcome.response.status === 200) {
        alert("Incremented!");
      }
    } catch (error) {
      if (error.response.status === 404) {
        setStatus("No resources found!");
      }
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (isHovering) {
      setTheProgressVal((prev) => prev + topicRelated.length / 100);
      IncrementProgress();
    }
  }, [isHovering, topicRelated]); // Increment progress when hovering or when topicRelated changes

  return topicRelated && topicRelated.incompleteLessons ? (
    <div>
      {theTopic === "Pure" ? (
        <h1>Pure Mathematics I</h1>
      ) : theTopic === "Stat" ? (
        <h1>Probability And Statistics</h1>
      ) : (
        <h1>No Topic!</h1>
      )}
      <h1>Learn Clicked</h1>
      <h1>{topicRelated.topic}</h1>
      <p>{topicRelated.source}</p>
      <div>
        <br />
        {topicRelated.incompleteLessons.map((lesson, index) => (
          <div key={index}>
            <Link to={lesson}>{lesson}</Link>
          </div>
        ))}
        <br />
      </div>
      <button onClick={IncrementProgress}>Next Page!</button>
      <p>{status}</p>
    </div>
  ) : (
    <h1>No Topic Related Resources!</h1>
  );
  
};

export default LearnClicked;
