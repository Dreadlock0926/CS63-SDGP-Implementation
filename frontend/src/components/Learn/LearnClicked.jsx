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
  } = useContext(UserContext);
  const { lesson } = useParams();
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await Axios.post(`${BASE}/resources/false-topic`, {
          userId: "65f57152c37530390606d744",
          theTopic: lesson,
        });
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
        progress: theProgressVal,
        userId: "65f2a146a0acea296a663650", //user.id
      });
      setLessonCounter((prev)=>prev+1);
      if (outcome.data.status === 200) {
        alert("Incremented!");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (isHovering) {
      setTheProgressVal((prev) => prev + topicRelated.length / 100);
      IncrementProgress();
    }
  }, [isHovering, topicRelated]); // Increment progress when hovering or when topicRelated changes

  return topicRelated.length ? (
    <div>
      <h1>Learn Clicked</h1>
      {topicRelated.map(
        (x) =>
          x.topic === lesson && (
            <div key={x._id}>
              <h1>{x.source}</h1>
              <p>{x.topic}</p>
              {x.lessonPages[0]}
            </div>
          )
      )}
      <p>{lessonCounter}</p>
      <Link to={`/nextpage`} onClick={IncrementProgress}>
        Next Page!
      </Link>
      <p>{JSON.stringify(topicRelated)}</p>
      <p>The status {status}</p>
    </div>
  ) : (
    <h1>No Topic Related Resources!</h1>
  );
};

export default LearnClicked;
