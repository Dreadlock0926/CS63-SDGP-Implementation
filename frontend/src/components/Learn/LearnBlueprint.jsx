/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import Axios from "axios";

const LearnBlueprint = () => {
  const { theTopic } = useContext(UserContext);
  const [topicRelated, setTopicRelated] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const navigator = useNavigate();

  const BASE = "http://localhost:8000/resources/topic/learned";

  async function fetchData(topic) {
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}`, { theTopic: topic });
      setTopicRelated(response.data);
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
        await fetchData("Probability and Statistics I");
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
                  {item.topics.map((topic, topicIndex) => (
                    <tr key={`${item._id || index}-${topicIndex}`}>
                      <td>{topic}</td> {/**The topic names */}
                      <td>
                        {item.learnedProgress.map((progress, progressIndex) => (
                          <div
                            key={`${
                              item._id || index
                            }-learned-${progressIndex}`}
                          >
                            <Link to={progress.url}>{progress.percentage}</Link>{" "}
                            {/**The topic percentages */}
                          </div>
                        ))}
                      </td>
                      <td>
                        {item.tested.map((test, testIndex) => (
                          <div key={`${item._id || index}-tested-${testIndex}`}>
                            <Link
                              to={test.testedExams.map((x) => {
                                return x;
                              })}
                            >
                              {test.state ? "Tested" : "Not Tested"}{" "}
                              {/**has he done it? */}
                            </Link>
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <Typography variant="body1">{status}</Typography>
        </>
      )}
    </Container>
  );
};

export default LearnBlueprint;
