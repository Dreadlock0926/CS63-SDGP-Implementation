import Axios from "axios";
import { useEffect, useState } from "react";

const LearningStatistics = () => {

  const [resource,setResources] = useState([])

  async function StatRelated(){
    try{
      const response = await Axios.get("http://localhost:8000/resources/stat"); //might have to change these routes
      setResources(response.data)
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    StatRelated();
  },[])




  return (
    <div><h1>Statistics Material</h1><>{resource && resource.length ? JSON.stringify(resource) : <h1>No results found!</h1>}</></div>
  )
}

export default LearningStatistics;