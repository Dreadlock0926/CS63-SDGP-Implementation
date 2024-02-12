/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import {useNavigate} from "react-router-dom"
// import MathJax from "better-react-mathjax"
import MathLive from "../Math";
import Axios from "axios";
import { UserContext } from "../../App";
import Scope from "./Scope";
import "./Exam.css";

  // const startExamTimer = () => {
  //   if(started===0){  
  //     started++;  
   
  //     intervalRef.current = setInterval(() => {
  //       do{
  //         setTime((prev) => prev + 1);
  //       }while(time<60000) 
  //   }, 1000);}
  //   else{
  //     alert("Time's up!")
  //   }
  // };


const ExamPage = () => {
  const {status,setStatus,setLoading} = useContext(UserContext)
  const [time, setTime] = useState(0);
  const startButtonRef = useRef();
  const stopButtonRef = useRef();
  const intervalRef = useRef();
  const [questions,setQuestions] = useState([])


  const navigator = useNavigate();
  let started = 0;


  const stopExamTimer = () => { 
    clearInterval(intervalRef.current);
    setTimeout(() => {
   
     navigator("/examfinal") 
    }, 2000);
  };

  const sendExamData = async (id) => {
    if(time<20000){ //assuming at least 2 mins should be elapsed
      stopExamTimer();
      localStorage.setItem("time", time);
  
      //might have to set the exam marks in local storage to get in the finalized page!
      const sendAnswers = await Axios.post("http://localhost:8000/exam") //route of question!
      if(sendAnswers.status===200){
        // setTimeout(() => {
        //   // Redirect to "/examfinal" after 2 seconds
        //  navigator("/examfinal") 
        // }, 2000);
      }else{
        setStatus("Error while sending answers!")
      }
    }else{
      alert("Way too early to submit!")
    }

    


  
  };

  async function fetchExam(){
    try{
      setLoading(true);
      const exam = await Axios.get("http://localhost:8000/exam");
      setQuestions(exam.data);
    }catch(err){
      console.error(err);
    }finally{
      setLoading(false);
    }
  }
  

  //exam depending on questionID
  /*let text = "s1_p_3_s2018_2"
let part = text.split("_");
console.log(part); //frontend*/ 
  

  useEffect(() => {
    
    return () => {
      fetchExam();
      // Cleanup the interval on component unmount
      clearInterval(intervalRef.current);
    };
  }, []);

  

  

  return (
    <div className="container">
      <h1>Exam Page</h1>
      {/* <button onClick={startExamTimer} ref={startButtonRef}>
        Start Exam!
      </button> */}
      <p>{JSON.stringify(questions)}</p>
      <MathLive />
      <Scope/> {/**Scope component */}
      <div>
        <h2>{`${time} seconds <- Time Elapsed`}</h2>
   
        <LineChart
          xAxis={[{ data: [0, 2, 3, 5, 8, 10] }]} //possibly an mapping to the cordinates?
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          width={500}
          height={300}
        />
      </div>
      <button onClick={(e)=>{
        e.preventDefault(); //lets send the id and the corresponding answer!
        sendExamData()//x._id assuming x is used to iter!
      }} ref={stopButtonRef}>
        Done! 👍🏻
      </button>
      {status}
    </div>
  );
};

export default ExamPage;
