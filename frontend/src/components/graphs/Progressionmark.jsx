/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { UserContext } from "../../App";
import "./Progressionmark.css";

function Progressionmark() {
  const { value, setValue } = useContext(UserContext);
  const { statValue, setstatValue, username, password,setUserName,setPassword} = useContext(UserContext);

  const [totalMark, setTotalMark] = useState(0); // Use a state variable to store the total marks
  const [totalStatMarks,setTotalStatMarks] = useState(0);
  const [average, setAverage] = useState(0);
  const [chartData, setChartData] = useState([]);

  const apiUrl = "http://localhost:8000/progression/get";

  function calculation(data) {

    const mathsMarks = data.testHistory.Maths;
    const statMarks = data.testHistory.Statistics;

    if(mathsMarks.length>=statMarks.length){
      const transFormData = mathsMarks.map((mark,index)=>({
        testNumber: index + 1, // Or any other identifier for the X-axis
        Maths: mark,
        Statistics: statMarks[index] || 0,
      }))
    setChartData(transFormData);

    }else{
      const transFormData = statMarks.map((mark,index)=>({
         testNumber: index + 1, // Or any other identifier for the X-axis
         Statistics: mark,
         Maths: mathsMarks[index] || 0,
    }))
    setChartData(transFormData);
    }

    // Assuming `data` is the object containing the `testHistory` and other properties
    if (data && data.testHistory && data.testHistory.Maths) {
      const totalMathsMarks = data.testHistory.Maths.reduce((acc, currentMark) => acc + currentMark, 0);
      const averageMathsMarks =  Math.round(totalMathsMarks / data.testHistory.Maths.length);
      setTotalMark(totalMathsMarks); // Update the total marks state with the total for Maths
      setAverage(averageMathsMarks); // Update the average marks state with the average for Maths
      console.log("Total Maths marks: " + totalMathsMarks + ", Average Maths marks: " + averageMathsMarks);
    }

    if(data&&data.testHistory && data.testHistory.Statistics){
      const totalStatMathMarks = data.testHistory.Statistics.reduce((acc,currentMark)=>acc+currentMark,0);
      const averageStatMarks = Math.round(totalStatMathMarks/data.testHistory.Statistics.length);
      setTotalStatMarks(averageStatMarks);

    }
  }
  
  
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.post("http://localhost:8000/registration/login", {
          username: username, 
          password: password
        });
        
        
        console.log("Fetched data: ", response);
        setValue(response); // Assuming this updates your component state correctly
  
        // Now call calculation with the fetched data
        calculation(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [username,password]); // Include apiUrl as a dependency

  const renderLineChart = (
    <>
      <LineChart
        width={500}
        height={350}
        data={chartData}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line
          type="monotone"
          dataKey="Maths"
          stroke="#8884d8"
        />
        <Line
          type="monotone"
          dataKey="Statistics"
          stroke="#8884d8"
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="testNumber" />
        <YAxis />
      </LineChart>
    </>
  );

  return (
    <div className="progress-container">
      {/* <h1>Student progression tracker</h1> */}
      {/* <p>Total Marks: {totalMark}</p> */}
      <div className="avg-mark-container">
        <p>Average Mathematics Mark</p>
        <h2>{average}</h2><br />
        <p>Average Statistics Mark</p>
        <h2>{totalStatMarks}</h2>

      </div>

      <div>{renderLineChart}</div>
    </div>
  );
}

export default Progressionmark;
