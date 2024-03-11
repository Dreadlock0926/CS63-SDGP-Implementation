/* eslint-disable react-hooks/exhaustive-deps */
import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Pure.css";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Link,
  Button,
} from "@mui/material";

const LearningPureMaths = () => {
  const BASE = "http://localhost:8000/resources/topic";
  const [resources, setResources] = useState([]);
  const [theTopics, setTheTopics] = useState([]);
  const [status, setStatus] = useState("");
  const { id } = useParams();

  async function PureMathsRelated() {
    try {
      const { data } = await Axios.post(`${BASE}/${id}`, {
        topic: "Pure Mathematics I",
      });
      setResources(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function getTopics() {
    try {
      const theTopics = await Axios.post(`${BASE}/learned`,{theTopic:"Pure Mathematics I"});
      // if (theTopics.data.status === 200) {

      // }
      setTheTopics(theTopics.data);
      console.log(theTopics.data);
    } catch (err) {
      console.error(err);
      if (err.data.status === 404) {
        setStatus("No resources found!");
      }
    }
  }

  useEffect(() => {
    PureMathsRelated();
    getTopics();
  }, []);

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", marginTop: "5%" }}>
      <Typography variant="h3" gutterBottom>
        Pure Maths I
      </Typography>
      <div className="pure-container">
        <br />
        {theTopics && theTopics.length ? (
          <div>
            {theTopics.map((topic) =>
              topic.topics.map((subtopic, index) => (
                <Link key={subtopic._id || index}>{subtopic}</Link>
              ))
            )}
          </div>
        ) : (
          "No topics found!"
        )}
      </div>
      {resources && resources.length ? (
        resources.map((resource) => (
          <Card
            key={resource._id}
            sx={{ margin: "20px", padding: "20px", boxShadow: 4 }}
          >
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {resource.title}
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {resource.about}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {resource.subtopic}
              </Typography>
              {resource.image && (
                <img src={resource.image} alt={resource.title} height={200} />
              )}
              <br />
              {resource.url && (
                <Link
                  href={resource.url}
                  color="primary"
                  underline="hover"
                  sx={{ mr: 1 }}
                >
                  Click Here to Learn More!
                </Link>
              )}
              <Button variant="contained" color="primary" href={resource.url}>
                Go to Resource
              </Button>
            </CardContent>
            <p>{status}</p>
          </Card>
        ))
      ) : (
        <Typography variant="h4">No Pure Maths resources found!</Typography>
      )}
    </Container>
  );
};

export default LearningPureMaths;
