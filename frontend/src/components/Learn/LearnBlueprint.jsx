/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
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
import "./Learn.css";

const LearnBlueprint = () => {
  const {
    theTopic,
    BASE,
    user,
    data,
    setData,
    loggedInUser,
    setLoggedInUser,
    theProgressVal,
    source,
    setSource,
    setTheProgressVal,
    falseTopics,
    setFalseTopics,
    setTheTopic,
    setLessonTopic,
    setTopicRelated,
  } = useContext(UserContext);

  const { topic } = useParams();

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topicTitles, setTopicTitles] = useState([]);
  const [topicPercentage, setTopicPercentage] = useState([]);
  const [topicFirstLesson, setTopicFirstLesson] = useState({});
  const [completedTopical, setCompletedTopical] = useState([]);
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

  async function fetchData(source) {
    try {
      console.log(`The topic is ${source}`);
      setLoading(true);
      // const response = await Axios.post(`${BASE}/resources/topic/learned`, {
      //   theTopic: topic,
      // });
      // setTopicRelated(response.data);
      // console.log(`The topics ${JSON.stringify(response.data)}`);
      const theUser = await Axios.post(`${BASE}/resources/testing-user`, {
        userID: loggedInUser._id, //user.id
        source,
      });
      setSource(source);
      setUserData(theUser.data.topicCompletions);
      setTopicTitles(Object.keys(theUser.data.topicCompletions));
      setTopicFirstLesson(theUser.data.topicFirstLesson);
      setTopicPercentage(Object.values(theUser.data.topicCompletions));
    } catch (error) {
      if (error.status === 404) {
        setStatus("No resources found!");
      } else {
        setStatus("Error occurred while fetching resources.");
      }
    } finally {
      setLoading(false);
    }
  }
  let availableDisabled = 0;

  const getCompletedTopicalExams = async () => {
    let moduleNeeded = "";
    if (topic === "p1") {
      moduleNeeded = "Pure Mathematics I";
    } else if (topic === "s1") {
      moduleNeeded = "Probability & Statistics I";
    }

    try {
      const response = await Axios.post(
        `${BASE}/resources/getCompletedTopicalExams`,
        {
          userId: loggedInUser._id, //user.id
          moduleNeeded: moduleNeeded,
        }
      );
      console.log(response.data);
      setCompletedTopical(response.data.completedExams);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedUser")).data);
  }, []);

  useEffect(() => {
    if (Object.keys(loggedInUser).length > 0) {
      console.log(loggedInUser);

      getCompletedTopicalExams();

      const fetchTopicData = async () => {
        if (topic === "p1") {
          await fetchData("p1");
        } else if (topic === "s1") {
          await fetchData("s1");
        } else {
          navigator("/resources");
        }
      };

      fetchTopicData();
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (completedTopical.length > 0) {
      console.log(`Completed Topical Exams: ${completedTopical}`);
    }
  }, [completedTopical]);

  // useEffect(() => {
  //   console.log(
  //     userData
  //       ? `The user data -> ${JSON.stringify(userData)}`
  //       : "No data bozo!"
  //   );
  // }, [userData]);

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

  const generateTopicalExam = async (topical) => {
    await Axios.post(
      "http://localhost:8000/getQuestionsOnTopic/getQuestionsForExam",
      {
        topics: [topical],
      }
    )
      .then(function (response) {
        let questionIDs = [];
        response.data.forEach((element) => {
          questionIDs.push(element.questionID);
        });
        if (questionIDs.length > 0) {
          topicExamHelper(topical, questionIDs);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const topicExamHelper = async (topical, questionIDs) => {
    let moduleFull = "";

    if (topic === "p1") {
      moduleFull = "Pure Mathematics I";
    } else {
      moduleFull = "Probability and Statistics I";
    }

    await Axios.post("http://localhost:8000/exam/saveExam", {
      examType: "Topical",
      examQuestions: questionIDs,
      userRef: loggedInUser._id,
      examModule: moduleFull,
      examTopic: topical,
    })
      .then(function (response) {
        navigator(`/exam/${response.data[0].Alert}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    setInterval(() => {
      setStatus("");
    }, 3200);
  }, [status]);

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      {topicTitles && topicTitles.length && (
        <Container
          style={{ display: "flex", fontFamily: "poppins" }}
          className="container"
        >
          {loading ? (
            <Typography variant="h4">Loading...</Typography>
          ) : (
            <>
              <Typography variant="h3">
                {topic === "p1"
                  ? "Pure Mathematics I"
                  : "Probability And Statistics"}
              </Typography>
              <br />

              <br />
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
                              to={`/learning/${source}/${title}/${topicFirstLesson[title]}`}
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
                              100 ? (
                                <p style={{ color: "green" }}>Completed</p>
                              ) : (
                                <p
                                  style={{ color: "red" }}
                                >{`${topicPercentage[index].completedPercentage}% Complete`}</p>
                              )}
                            </RouterLink>
                          )}
                        </TableCell>
                        <TableCell>
                          {topicPercentage &&
                            completedTopical &&
                            topicPercentage[index] &&
                            (topicPercentage[index].completedPercentage ===
                            100 ? (
                              // <RouterLink
                              //   component="button"
                              //   variant="body2"
                              //   to={
                              //     !topicPercentage[index].examCompleted &&
                              //     `/topicalExam/${title}`
                              //   }
                              // >
                              //   {completedTopical.includes(topicTitles[index])
                              //     ? "Done"
                              //     : "Available"}
                              // </RouterLink>

                              completedTopical.includes(topicTitles[index]) ? (
                                <RouterLink
                                  variant="body2"
                                  onClick={() => {
                                    setStatus(`You have completed ${title}`);
                                  }}
                                  style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                  }}
                                >
                                  Done
                                </RouterLink>
                              ) : (
                                // <RouterLink
                                //   component="button"
                                //   variant="body2"
                                //   to={
                                //     !topicPercentage[index].examCompleted &&
                                //     `/topicalExam/${title}`
                                //   }
                                // >
                                //   Available
                                // </RouterLink>
                                !topicPercentage[index].examCompleted && (
                                  <button
                                    onClick={() => {
                                      if(availableDisabled!==1){
                                        availableDisabled++;
                                        generateTopicalExam(topicTitles[index]);
                                      }
                                   
                                      // Disable the button after it's clicked
                                    }}
                                    disabled={availableDisabled === 1}
                                  >
                                    Available
                                  </button>
                                )
                              )
                            ) : (
                              <RouterLink
                                variant="body2"
                                onClick={() => {
                                  setStatus(
                                    `Please complete ${title} to access the Topical Exam!`
                                  );
                                }}
                              >
                                Unavailable
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
            </>
          )}
          <Typography variant="body1">{status}</Typography>
        </Container>
      )}
    </>
  );
};

export default LearnBlueprint;
