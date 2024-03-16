/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import Axios from "axios";

const LearnBlueprint = () => {
  const { theTopic, BASE, user, setSpecificTopic,topicRelated, setTopicRelated} = useContext(UserContext);

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
        userId: "65f471667a725acbb3ba057f", //user.id
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
              {/* {userData.map((x) => {
                <div key={x._id}>
                  <h1>{x.completionPercentage}</h1>
                </div>;
              })} */}
              <Link to={"/learnclicked"}>{JSON.stringify(userData)}</Link> {/**User Data */}
              <br/>
      
            </tbody>
          </table>
          <div>
            {userData && userData.length ? (
              userData.map((x, index) => (
                <div key={x._id || index}>
                  <p>{x.completionPercentage}</p>
                </div>
              ))
            ) : (
              <p>No data found</p>
            )}
            {/* <Link>{`${JSON.stringify(
              userData.completionPercentage
            )} Complete!`}</Link> */}
          </div>
          <Typography variant="body1">{status}</Typography>
        </>
      )}
    </Container>
  );
};

export default LearnBlueprint;
