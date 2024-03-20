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

import Button from "@mui/material/Button";

const LearnClicked = () => {
  const [hoverRef, isHovering] = useHover();
  const {
    BASE,
    theProgressVal,
    setLessons,
    setLoading,
    loading,
    TheSource,
    setTheProgressVal,
    topicRelated,
    setTopicRelated,
    user,
    falseTopics,
    setFalseTopics,
    theTopic,
  } = useContext(UserContext);
  const { topic, lesson } = useParams();
  const [lessonCounter, setLessonCounter] = useState(0);
  const [status, setStatus] = useState("");
  const [theLessonName, setTheLessonName] = useState("");
  const navigator = useNavigate();

  async function fetchData() {
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/resources/fromtopics`, {
        userId: "65f86f434b9403f9d70d8aa3",
        topic,
        source: TheSource,
      });
      setTopicRelated(response.data);
      setStatus("");
    } catch (error) {
      console.error(error.message);
      if (error.status === 404) {
        setStatus("No resources found!");
      }
    } finally {
      setLoading(false);
    }
  }

  async function FalseTopics() {
    try {
      const response = await Axios.post(`${BASE}/resources/false-topic`, {
        userId: "65f86f434b9403f9d70d8aa3",
        topic,
        source: TheSource,
      });
      if (response.status === 200) {
        setFalseTopics(response.data);
      }
    } catch (err) {
      if (err.status === 404) {
        setStatus("No data found!");
      }
      console.error(err.message);
    }
  }

  useEffect(() => {
    fetchData();
    FalseTopics();
  }, [lesson]);

  useEffect(() => {
    const currentLesson = topicRelated[lessonCounter]?.lessonTitle || "";
    setTheLessonName(decodeURIComponent(lesson));
  }, [lessonCounter, topicRelated]);

  const IncrementProgress = async () => {
    try {
      const lessonNameArray = topicRelated.map((x) => x?.lessonTitle);

      const outcome = await Axios.put(`${BASE}/resources/progress/updates`, {
        userId: "65f86f434b9403f9d70d8aa3",
        topic,
        source: TheSource,
        lessonName: lessonNameArray[lessonCounter],
      });

      if (outcome.status === 200) {
        setLessonCounter((prev) => prev + 1);
        FalseTopics();
      }
    } catch (error) {
      if (error.status === 404) {
        setStatus(`Congrats! You have completed ${topic}! 🥳`);
      }
      console.error(error.message);
    }
  };

  return topicRelated && topicRelated.length ? (
    loading ? (
      <h1>Loading...</h1>
    ) : (
      <>
        <div style={{ display: "flex", fontFamily: "poppins" }}>
          <div
            className="sidebar"
            style={{
              width: "20%",
              marginRight: "20px",
              margin: "20px",
              padding: "20px",
              borderRight: "12px solid #17B169",
              borderWidth: "5px",
              borderRadius: "5px",
            }}
          >
            <h1>{topic}</h1>
            {topicRelated.map((x, index) => (
              <ul
                key={index}
                style={{
                  listStyleType: "none",
                  textDecoration: "none",
                  fontSize: 10,
                }}
              >
                <Link
                  to={`/learnclicked/${topic}/${encodeURIComponent(
                    x.lessonTitle
                  )}`}
                  style={{ textDecoration: "none" }}
                >
                  {falseTopics?.incompleteLessons.includes(x.lessonTitle) ? (
                    <h1 style={{ color: "red" }}>{x.lessonTitle}</h1>
                  ) : (
                    <h1 style={{ color: "green" }}>{x.lessonTitle}</h1>
                  )}
                </Link>
              </ul>
            ))}
          </div>
          <div
            style={{
              flex: 1,
              border: "12px solid #17B169",
              borderWidth: "5px",
              margin: "20px",
              padding: "10px",
            }}
          >
            <h1>{status}</h1>
            {topicRelated.map((x, index) => (
              <div key={index} style={{ margin: "2%", padding: "2%" }}>
                {lesson === x.lessonTitle ? (
                  <div>
                    <h1>
                      {falseTopics?.incompleteLessons.includes(x.lessonTitle)
                        ? x.lessonTitle
                        : `${x.lessonTitle} (Completed)`}
                    </h1>
                    {x?.lessonBody?.lessonSection &&
                      x?.lessonBody?.lessonSection.map((section, index) => (
                        <Typography key={index} variant="h5">
                          {section}
                        </Typography>
                      ))}
                    {x?.lessonBody?.sectionImgURL &&
                      x?.lessonBody?.sectionImgURL.map((url, index) => (
                        <img key={index} src={url} />
                      ))}
                  </div>
                ) : null}
              </div>
            ))}
            <Button
              onClick={() => {
                if (topicRelated[lessonCounter].lessonTitle !== null) {
                  navigator(
                    `/learnclicked/${topic}/${encodeURIComponent(
                      topicRelated.lessonTitle[lessonCounter]
                    )}`
                  );
                  IncrementProgress();
                }
              }}
              // disabled={
              //   lessonCounter >=
              //   topicRelated?.lessonTitle[lessonCounter]?.length
              // }
            >
              Next Page!
            </Button>
          </div>
        </div>
      </>
    )
  ) : (
    "No subtopic has been selected!"
  );
};

export default LearnClicked;
