/* eslint-disable react-hooks/exhaustive-deps */
import  { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import {UserContext} from "../../App"
import "./Progressionmark.css"

function Progressionmark() {
    const {value,setValue} = useContext(UserContext)
    const {statValue,setstatValue} = useContext(UserContext);
  const [totalMark, setTotalMark] = useState(0); // Use a state variable to store the total marks
  const [average,setAverage] = useState(0);
  const apiUrl = "http://localhost:8000/progression/get";

  function calculation() {
    // Use reduce to sum up the marks in the value array
    const total = value.reduce((acc, e) => {
      return acc + e.marks; //PLEASE COMMENT WHEN U DO SOME NEW SHIT 
     
    }, 0);

    setTotalMark(total); // Update the total marks state
    setAverage(totalMark/value.length); //this logic is wrong

    console.log("The total marks are " + total);
  }



 



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        console.log(response.data);
        setValue(response.data);
    
        console.log(`Value contains ${JSON.stringify(value)}`);
    
        calculation(); // Call the calculation function after updating the value state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiUrl]); // Include apiUrl as a dependency

  const renderLineChart = (
    <>
       <LineChart
      width={500}
      height={350}
      data={value}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      
      <Line type="monotone" dataKey="PureMathematics.learnedProgress" stroke="#8884d8" />
      <Line type="monotone" dataKey="Statistics.learnedProgress" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="testnumber" />
      <YAxis />
    </LineChart>
    
    </>
   

    
  );

  return (
    <div className="progress-container">
      {/* <h1>Student progression tracker</h1> */}
      {/* <p>Total Marks: {totalMark}</p> */}
      <div className="avg-mark-container">
        <p>Average Mark</p>
        <h2>{average}</h2>
      </div>
      <div>{renderLineChart}</div>
    </div>
  );
}

export default Progressionmark;
