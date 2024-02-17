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
    <div><h1>Pure Maths Materials</h1>{resource && resource.length ? JSON.stringify(resource) : <h1>No results found!</h1>}</div>
  )
}

export default LearningPureMaths