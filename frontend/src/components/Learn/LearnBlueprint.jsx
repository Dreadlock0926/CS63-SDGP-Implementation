/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import Axios from "axios";

const LearnBlueprint = () => {
  const {
    theTopic,
    BASE,
    user,
    setSpecificTopic,
    topicRelated,
    data,
    setData,

    theProgressVal,
    TheSource,
    setSource,
    setTheProgressVal,

    setTheTopic,
    setLessonTopic,
    setTopicRelated,
  } = useContext(UserContext);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topicTitles, setTopicTitles] = useState([]);
  const [topicPercentage, setTopicPercentage] = useState([]);
  const [theSubTopic, setTheSubTopic] = useState("");
  const [status, setStatus] = useState("");
  const navigator = useNavigate();

  async function fetchData(topic, source) {
    try {
      setLoading(true);
      // const response = await Axios.post(`${BASE}/resources/topic/learned`, {
      //   theTopic: topic,
      // });
      // setTopicRelated(response.data);
      // console.log(`The topics ${JSON.stringify(response.data)}`);
      const theUser = await Axios.post(`${BASE}/resources/testing-user`, {
        userId: "65f584b5794ca9565c2dc26a", //user.id
        source,
      });
      setSource(source);
      setUserData(theUser.data);
      setTopicTitles(Object.keys(theUser.data));
      setTopicPercentage(Object.values(theUser.data));
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        setStatus("No resources found!");
      } else {
        setStatus("Error occurred while fetching resources.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function IncrementProgress() {

    try {
      const outcome = await Axios.put(`${BASE}/resources/progress/updates`, {
        userId: "65f584b5794ca9565c2dc26a",
        source: TheSource,
        //user.id
      });
      console.log(outcome.data);
      // if (outcome.data.status === 200) {
      //   setLessonCounter((prev) => prev + 1);
      // }
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    const fetchTopicData = async () => {
      if (theTopic === "Pure") {
        await fetchData("Pure Mathematics I", "p1");
      } else if (theTopic === "Stat") {
        await fetchData("Probability and Statistics", "s1");
      } else {
        navigator("/resources");
      }
    };

    fetchTopicData();
  }, [theTopic]);

  useEffect(() => {
    console.log(topicPercentage);
  }, [topicPercentage]);

  return topicTitles &&  topicTitles.length ? (
    <Container>
      {loading ? (
        <Typography variant="h4">Loading...</Typography>
      ) : (
        <>
          <Typography variant="h3">
            {theTopic === "Pure"
              ? "Pure Mathematics I"
              : "Probability And Statistics"}
          </Typography>
          <table style={{ width: "100%", textAlign: "center" }}>
            <thead>
              <tr>
                <th>Topic</th>
                <th>Learned Progress</th>
                <th>Incomplete Lessons</th>
              </tr>
            </thead>
            <tbody>
              {/* Rendering topicRelated */}
              {topicTitles &&
                topicTitles.map((title, index) => (
                  <tr key={index}>
                    <td>
                      <div>{title}</div>
                    </td>
                    <td>
                      {topicPercentage && topicPercentage[index] && (
                        <Link
                          to={
                            topicPercentage[index].completedPercentage === 100
                              ? () => {
                                  setStatus(
                                    "You have already completed this topic!"
                                  );
                                  setLessonTopic(0);
                                }
                              : `/learnclicked/${title}`
                          }
                          onClick={IncrementProgress}
                        >
                          {`${topicPercentage[index].completedPercentage}%`}
                        </Link>
                      )}
                    </td>
                    <td>
                      {topicPercentage && topicPercentage[index] && (
                        <Link
                          to={
                            topicPercentage[index].completedPercentage == 100
                              ? `/topicalExam/${title}`
                              : ""
                          }
                          onClick={IncrementProgress}
                        >
                          {topicPercentage[index].completedPercentage == 100
                            ? "Yes"
                            : "No"}
                        </Link>
                      )}
                    </td>
                    <td>{/* Render incomplete lessons here */}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Typography variant="body1">{status}</Typography>
        </>
      )}
    </Container>
  ) : <h1>No resources found!</h1>;
};

export default LearnBlueprint;
