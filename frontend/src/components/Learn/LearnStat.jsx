/* eslint-disable no-unused-vars */
import Axios from "axios";
import { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent } from "@mui/material";


const LearningStatistics = () => {

  const [resource,setResources] = useState([])

  async function StatRelated(){
    try{
      const response = await Axios.post("http://localhost:8000/resources/topic",{topic:"Probability And Statistics"}); //might have to change these routes
      setResources(response.data)
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    StatRelated();
  },[])


  return (
    <Container maxWidth="md" sx={{ padding: "10%" }}>
      <Typography variant="h3" gutterBottom>
        Statistics
      </Typography>
      {resource.length ? (
        resource.map((resource) => (
          <Card key={resource._id} sx={{ margin: "5%", padding: "5%", boxShadow: 4 }}>
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
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="h4">No Statistics Resources found!</Typography>
      )}
    </Container>
  );
}

export default LearningStatistics;