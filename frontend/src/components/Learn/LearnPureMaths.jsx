import Axios from "axios";
import { useEffect, useState } from "react";
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
  const [resources, setResources] = useState([]);

  async function PureMathsRelated() {
    try {
      const { data } = await Axios.post(
        "http://localhost:8000/resources/topic",
        { topic: "Pure Mathematics I" }
      );
      setResources(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    PureMathsRelated();
  }, []);

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", marginTop: "5%" }}>
      <Typography variant="h3" gutterBottom>
        Pure Maths Materials
      </Typography>
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
          </Card>
        ))
      ) : ( 
        <Typography variant="h4">No Pure Maths resources found!</Typography>
      )}
    </Container>
  );
};

export default LearningPureMaths;
