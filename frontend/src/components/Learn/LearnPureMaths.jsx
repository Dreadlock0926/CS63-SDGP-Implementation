/* eslint-disable react-hooks/exhaustive-deps */
import Axios from "axios";
import { useEffect, useState } from "react";
import "./Pure.css";
import { Container, Typography, Card, CardContent, Link } from "@mui/material";


const LearningPureMaths = () => { 

 

  const [resource,setResources] = useState([])

  async function PureMathsRelated(){
    try{
      const response = await Axios.post("http://localhost:8000/resources/topic",{topic:"Pure Mathematics I"}); //might have to change these routes
      setResources(response.data)
      console.log(resource)
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    PureMathsRelated();
  },[])




  return (
    <Container maxWidth="md" sx={{ textAlign: "center", marginTop: "5%" }}>
      <Typography variant="h3" gutterBottom>
        Pure Maths Materials
      </Typography>
      {resource.length ? (
        resource.map((resource) => (
          <Card key={resource._id} sx={{ margin: "20px", padding: "20px", boxShadow: 4 }}>
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
              <Link href={resource.url ? resource.url : ""} color="primary" underline="hover">
                Click here to learn more
              </Link>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="h4">No Pure Maths resources found!</Typography>
      )}
    </Container>
  );
}

export default LearningPureMaths