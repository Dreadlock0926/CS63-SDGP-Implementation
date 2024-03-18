/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import Axios from "axios";
import { useHover } from "@uidotdev/usehooks";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const LearnClicked = () => {
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
  const [lessonCounter, setLessonCounter] = useState(0);
  const [status, setStatus] = useState("");
  const [theLessonName, setTheLessonName] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await Axios.post(`${BASE}/resources/false-topic`, {
          userId: "65f584b5794ca9565c2dc26a",
          topic: lesson,
          source: TheSource,
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

  // useEffect(() => {
  //   console.log(lessonCounter < topicRelated.incompleteLessons.length);
  // }, [topicRelated]);

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

  const [lessonName, setLessonName] = useState("");

  const IncrementProgress = async () => {
    console.log(lesson, TheSource, lessonName);
    try {
      const outcome = await Axios.put(`${BASE}/resources/progress/updates`, {
        userId: "65f584b5794ca9565c2dc26a", //user.id
        topic: lesson,
        source: TheSource,
        lessonName: lessonName, //user.id
      });

      setLessonCounter((prev) => prev + 1);
      if (outcome.status === 200) {
        alert("Incremented!");
      }
    } catch (error) {
      if (error.status === 404) {
        setStatus("No resources found!");
      }
      console.error(error.message);
    }
    setLessonCounter((counter) => counter + 1);
  };

  useEffect(() => {
    if (isHovering) {
      setTheProgressVal((prev) => prev + topicRelated.length / 100);
      IncrementProgress();
    }
  }, [isHovering, topicRelated]); // Increment progress when hovering or when topicRelated changes

  useEffect(() => {
    if (lessonName) {
      console.log(lessonName);
    }
  }, [lessonName]);

  useEffect(() => {
    if (Object.keys(topicRelated).length > 0) {
      setLessonName(topicRelated.incompleteLessons[lessonCounter]);
    }
  }, [lessonCounter, topicRelated]);

  return (
    !loading &&
    topicRelated &&
    topicRelated.incompleteLessons &&
    theTopic &&
    (loading ? (
      "Loading..."
    ) : status ? (
      <Typography variant="h3">{status}</Typography>
    ) : (
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
        <div>
          {topicRelated.incompleteLessons.length > 0 ? (
            <div>
              <Link
                to={
                  lessonCounter <= topicRelated.incompleteLessons.length
                    ? () => {
                        topicRelated.incompleteLessons[lessonCounter];
                        setLessonName(
                          topicRelated.incompleteLessons[lessonCounter]
                        );
                      }
                    : "You have completed the topic!"
                }
              >
                {topicRelated.incompleteLessons[lessonCounter]}
              </Link>
            </div>
          ) : (
            <h1>{`You have completed ${topicRelated.topic}`}</h1>
          )}
        </div>
        <h1>{topicRelated.incompleteLessons[lessonCounter]}</h1>
        <button
          onClick={() => {
            if (lessonCounter < topicRelated.incompleteLessons.length - 1) {
              IncrementProgress(); //works
            } else {
              setStatus(`Congrats you have completed ${lesson}`);
              setTimeout(() => {
                navigator("/learnprint");
              }, 1500);
            }
          }}
          disabled={lessonCounter >= topicRelated.incompleteLessons.length}
        >
          {`Next Page!`}
        </button>
        {/* <p>{status}</p> */}
      </div>
    ))
  );
};

export default LearnClicked;
