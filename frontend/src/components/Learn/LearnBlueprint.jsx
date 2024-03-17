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
    setTopicRelated,
  } = useContext(UserContext);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const navigator = useNavigate();

  async function fetchData(topic) {
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/resources/topic/learned`, {
        theTopic: topic,
      });
      setTopicRelated(response.data);
      console.log(response.data);
      const theUser = await Axios.post(`${BASE}/resources/testing-user`, {
        userId: "65f57152c37530390606d744", //user.id
      });
      setUserData(theUser.data);
      console.log(theUser.data);
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

  useEffect(() => {
    const fetchTopicData = async () => {
      if (theTopic === "Pure") {
        await fetchData("Pure Mathematics I");
      } else if (theTopic === "Stat") {
        await fetchData("Probability and Statistics");
      } else {
        navigator("/resources");
      }
    };

    fetchTopicData();
  }, [theTopic]);

  return (
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
                <th>Tested</th>
              </tr>
            </thead>
            <tbody>
              {topicRelated.map((x, index) => (
                <tr key={index}>
                  <td>{x.topic}</td>
                  <td>
                    <p>{x.learnedProgress}</p> {/* Display learned progress */}
                    <Link to={`/learnclicked/${x.topic}`}>
                      {/* Link to continue learning */}
                      {x.topic}
                    </Link>
                  </td>
                  <td>
                    {/* Add column for "Tested" if needed */}
                    {/* Content for the "Tested" column */}
                  </td>
                </tr>
              ))}
              {/* User Data */}
              {userData && userData.length ? (
                userData.map((x, index) => (
                  <tr key={x._id || index}>
                    <td colSpan="3">{x.completionPercentage}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No completed Progress found</td>
                </tr>
              )}
            </tbody>
          </table>
          <Typography variant="body1">{status}</Typography>
        </>
      )}
    </Container>
  );
};

export default LearnBlueprint;
