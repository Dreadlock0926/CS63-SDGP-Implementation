/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
} from "@mui/material";
import { styled } from "@mui/system";
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

  const useStyles = styled((theme) => ({
    tableRow: {
      transition: "box-shadow 0.3s, border-color 0.3s",
      "&:hover": {
        borderColor: "green",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
      },
    },
  }));

  async function fetchData(topic, source) {
    try {
      setLoading(true);
      // const response = await Axios.post(`${BASE}/resources/topic/learned`, {
      //   theTopic: topic,
      // });
      // setTopicRelated(response.data);
      // console.log(`The topics ${JSON.stringify(response.data)}`);
      const theUser = await Axios.post(`${BASE}/resources/testing-user`, {
        userID: "65f86f434b9403f9d70d8aa3", //user.id
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

  async function IncrementProgress(theSource) {
    // try {
    //   const outcome = await Axios.put(`${BASE}/resources/progress/updates`, {
    //     userId: "65f86f434b9403f9d70d8aa3",
    //     source: TheSource,
    //     //user.id
    //   });
    //   console.log(outcome.data);
    //   // if (outcome.data.status === 200) {
    //   //   setLessonCounter((prev) => prev + 1);
    //   // }
    // } catch (err) {
    //   console.error(err.message);
    // }
    // alert("Clicked!");
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

  return (
    <>
      {topicTitles && topicTitles.length ? (
        <Container style={{ margin: "10px" }}>
          {loading ? (
            <Typography variant="h4">Loading...</Typography>
          ) : (
            <>
              <Typography variant="h3">
                {theTopic === "Pure"
                  ? "Pure Mathematics I"
                  : "Probability And Statistics"}
              </Typography>
              <Table style={{ width: "100%", textAlign: "center" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Topic</TableCell>
                    <TableCell>Learned Progress</TableCell>
                    <TableCell>Topical Exams</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Rendering topicRelated */}
                  {topicTitles &&
                    topicTitles.map((title, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div>{title}</div>
                        </TableCell>
                        <TableCell>
                          {topicPercentage && topicPercentage[index] && (
                            <RouterLink
                              to={
                                topicPercentage[index].completedPercentage !==
                                100
                                  ? `/learnclicked/${title}`
                                  : null
                              }
                              onClick={() => {
                                if (status !== "") {
                                  // Set status if completed
                                  setStatus("");
                                }
                                if (
                                  topicPercentage[index].completedPercentage ===
                                  100
                                ) {
                                  setStatus(`You have completed ${title}`);
                                }
                                // Prevent default link behavior
                              }}
                            >
                              {topicPercentage[index].completedPercentage ===
                              100
                                ? "Completed"
                                : `${topicPercentage[index].completedPercentage}% Complete`}
                            </RouterLink>
                          )}
                        </TableCell>
                        <TableCell>
                          {topicPercentage &&
                            topicPercentage[index] &&
                            (topicPercentage[index].completedPercentage ===
                            100 ? (
                              <RouterLink
                                component="button"
                                variant="body2"
                                to={`/topicalExam/${title}`}
                              >
                                Yes
                              </RouterLink>
                            ) : (
                              <RouterLink
                                variant="body2"
                                onClick={() => {
                                  setStatus(
                                    `Please complete ${title} to access the Topical Exam!`
                                  );
                                }}
                              >
                                No
                              </RouterLink>
                            ))}
                        </TableCell>
                        <TableCell>
                          {/* Render incomplete lessons here */}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <Typography variant="body1">{status}</Typography>
            </>
          )}
        </Container>
      ) : (
        <Typography variant="h3">{`No ${
          theTopic === "Pure"
            ? "Pure Mathematics I"
            : "Probability And Statistics"
        } resources found!`}</Typography>
      )}
    </>
  );
};

export default LearnBlueprint;
