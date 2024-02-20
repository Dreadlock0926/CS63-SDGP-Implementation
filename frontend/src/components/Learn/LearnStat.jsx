import Axios from "axios";
import { useEffect, useState } from "react";

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
    <div style={{padding:"10%"}}><h1>Statistics</h1>{resource && resource.length ? 
    resource.map((x)=>(
    <div key={x._id} style={{margin:"5%",padding:"5%"}}>
      <h1>{x.topic}</h1>
      <h1>{x.title}</h1>
      <h1>{x.about}</h1>
      <h1>{x.subtopic}</h1>
      </div>))
       : <h1>No Statistics Resources found!</h1>}</div>
  )
}

export default LearningStatistics;