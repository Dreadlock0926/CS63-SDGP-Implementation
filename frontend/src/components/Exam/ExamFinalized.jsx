/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ExamFinalized = () => {
  const [marks, setMarks] = useState(20);

  //might have to use some local storage approach for this!

  useEffect(()=>{
  
    const item = localStorage.getItem("time");
    item ? setMarks(item) : console.log('Invalid no time!');
  },[])

  return (
    <div>
      <h1>Your Exam is Over!</h1>
      <p>Marks {marks}</p>
      <Link to="/">Go Back?</Link>
    </div>
  );
};

export default ExamFinalized;
