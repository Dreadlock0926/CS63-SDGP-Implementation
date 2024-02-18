/* eslint-disable react-hooks/exhaustive-deps */
import Axios from "axios";
import { useEffect, useState } from "react";

const LearningPureMaths = () => { 

 

  const [resource,setResources] = useState([])

  async function PureMathsRelated(){
    try{
      const response = await Axios.get("http://localhost:8000/resources/pure"); //might have to change these routes
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
    <div><h1>Pure Maths Materials</h1>{resource && resource.length && resource.title==="Pure Mathematics I" ? 
      resource.map((x)=>(
      <div key={x._id}>
        <h1>{x.topic}</h1>
        <h1>{x.title}</h1>
        <h1>{x.about}</h1>
        <h1>{x.subtopic}</h1>
     < a href={x.url? x.url :""}>{`Click here to learn more about ${x.title}`}</a>
        </div>))
         : <h1>No Pure Maths resources found!</h1>}</div>
  )
}

export default LearningPureMaths