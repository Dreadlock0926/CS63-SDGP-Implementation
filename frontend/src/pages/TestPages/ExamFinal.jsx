/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const ExamFinalized = () => {
  // const {} = useContext(UserContext)
  const [marks, setMarks] = useState(0);
  const [tracker,setTracker] = useState(0)

  //might have to use some local storage approach for this!

  useEffect( ()=>{
      const oldProgress = localStorage.getItem("progress");
    if(oldProgress){
      setTracker((prev)=>prev+=oldProgress)
    } else{
      const item = localStorage.setItem("progress",marks);
      item ? setMarks(item) : console.log('Invalid no time!');
    }
   
  },[])


  
  return (
    <div style={{textAlign:"center",color:"white"}}>
      <h1>Your Exam is Over!</h1>
      <p>Marks {marks}</p>
      <p>{`Tracking records -> ${tracker}`}</p>
      <Link to="/">Go Back?</Link>
    </div>
  );
};

export default ExamFinalized;
