/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import Axios from "axios";

const LearnBlueprint = () => {
  const { theTopic, BASE, user, setSpecificTopic } = useContext(UserContext);
  const [topicRelated, setTopicRelated] = useState([]);
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
      const theUser = await Axios.post(`${BASE}/resources/users`, {
        userId: "65f2a146a0acea296a663650", //user.id
      });
      setUserData(theUser.data);
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
              {topicRelated.map((item, index) => (
                <React.Fragment key={item._id || index}>
                  <p>{item.topic}</p>
                  {setSpecificTopic(item.topic)} 
                  {item.lessonPages.map((index) => (
                    <div className="lessonPages" key={index}>
                      <Link to={`/nextpage/${0}`}>
                        {index !== 0 ? `${item.topic} -> ${index}` : ""}
                      </Link>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
            <div>
              {userData && userData.length
                ? JSON.stringify(userData)
                : "No data found"}
            </div>
          </table>
          <Typography variant="body1">{status}</Typography>
        </>
      )}
    </Container>
  );
};

export default LearnBlueprint;
