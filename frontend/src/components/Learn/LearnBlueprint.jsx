/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { Container, Typography, Card, CardContent } from "@mui/material";
import Axios from "axios";

const LearnBlueprint = () => {
  const { theTopic, status, setStatus } = useContext(UserContext);
  const [topicRelated, setTopicRelated] = useState([]);
  const navigator = useNavigate();

  const BASE = "http://localhost:8000/resources/topic/learned";

  async function fetchData(topic) {
    try {
      const response = await Axios.post(`${BASE}/learned`, { theTopic: topic });
      setTopicRelated(response.data);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        setStatus("No resources found!");
      } else {
        setStatus("Error occurred while fetching resources.");
      }
    }
  }

  useEffect(() => {
    if (theTopic === "Pure") {
      fetchData("Pure Mathematics I");
    } else if (theTopic === "Stat") {
      fetchData("Probability and Statistics I");
    } else {
      navigator("/resources");
    }
  }, []);

  return (
    <>
      <div className="container">
        <h1>
          {theTopic === "Pure"
            ? "Pure Mathematics I"
            : theTopic
            ? "Probability And Statistics"
            : navigator("/resources")}
        </h1>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Topic</th>
              <th>Learned Progress</th>
              <th>Tested</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Topic 1", learnedProgress: "80%", tested: true },
              { name: "Topic 2", learnedProgress: "60%", tested: false },
              { name: "Topic 3", learnedProgress: "90%", tested: true },
            ].map((topic, index) => (
              <tr key={index}>
                <td>
                  <div style={{ textAlign: "center" }}>{topic.name}</div>
                </td>
                <td>
                  <div style={{ textAlign: "center" }}>
                    {topic.learnedProgress}
                  </div>
                </td>
                <td style={{ textAlign: "center" }}>
                  <div>{topic.tested ? "Yes" : "No"}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <p>{status}</p> */}
      </div>
    </>
  );
};

export default LearnBlueprint;
