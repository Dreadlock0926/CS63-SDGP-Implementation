import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { CircularProgressbar } from "react-circular-progressbar";
import { useNavigate } from 'react-router-dom';

const Displaygraph = () => {
  const navigator = useNavigate();
  const progressBarStyle = {
    // Set a smaller width and height for the progress bar container
    width: '100px',
    height: '100px'
  };
  
  // Use local state to store the chart data
  const [chartData, setChartData] = useState([]);
  const {testedPureProgress,setPureTestedProgress ,loggedInUser, setLoggedInUser} = useContext(UserContext);
  const [examId,setExamId] = useState(null);
  const [clickedPoint, setClickedPoint] = useState(null);
  const [pureMathsData, setPureMathsData] = useState([]);
  const [probStatsData, setProbStatsData] = useState([]);

  // eslint-disable-next-line react/prop-types
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
  
      const handleTooltipClick = (event) => {
        event.stopPropagation(); // Add this to stop event propagation
        const examId = data.id;
        console.log("Exam ID for navigation:", examId); // Debugging line
        navigator(`/exam-review/${examId}`);
      };
  
      return (
        <div className="custom-tooltip" onClick={handleTooltipClick}>
          <p>{label}</p>
          <p>{`Mark: ${payload[0].value}%`}</p>
        </div>
      );
    }
  
    return null;
  };
  const passData = (payload)=>{
    console.log(payload.payload.id);
    const examId = payload.payload.id;
    navigator(`/exam-review/${examId}`);

  }
  

  
  

  // You're already using useContext here, ensure that it provides 'id'
  const id = localStorage.getItem('id');

  useEffect(()=>{
    try{
      const fetchData =  ()=>{
        const sessionData = sessionStorage.getItem("loggedUser");
        if(sessionData){
          const sessionUser = JSON.parse(sessionData).data;
          setExamId(sessionUser.feedbackExams);
          console.log(sessionUser);
        }
      }
      fetchData();
    }catch(err){
      console.log(err);
    }
  },[])

  useEffect(()=>{
    console.log(examId);

  },[examId])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8000/progression/get/marks", { useRef: id });
        console.log(response)
        
        // Process the fetched data and calculate percentages
        

        
        const pureMathsarray = response.data.filter(item=> item.examModule==='Pure Mathematics I')
        .map((item, index) => ({
          name: `Exam ${index + 1}`, // Assuming you want to label exams numerically
          percentage: (item.mark / item.totalMark) * 100,
          id:item._id

        }));
        

        const statArray = response.data.filter(item=> item.examModule==='Probability & Statistics I')
        .map((item,index)=>({
          name: `Exam ${index + 1}`, // Assuming you want to label exams numerically
          percentage: (item.mark / item.totalMark) * 100,
          id:item._id

        }))
        
       
        
        setPureMathsData(pureMathsarray);
        setProbStatsData(statArray);
        // Set the processed data to the local state
        
        
        
        
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id,setPureTestedProgress]); // Only re-run the effect if 'id' changes




  // Render the LineChart with the data from state
  const renderLineChart = (
    <>
   <LineChart width={600} height={300} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name"  />
        <YAxis  />
        <Tooltip content={<CustomTooltip />} />
        {/* Line for Pure Mathematics I */}
        <Line type="monotone" dataKey="percentage" data={pureMathsData} stroke="#8884d8" name="Pure Mathematics I" activeDot={{ onClick: (event, payload) =>  passData(payload) }} />
        {/* Line for Probability & Statistics I */}
        <Line type="monotone" dataKey="percentage" data={probStatsData} stroke="#82ca9d" name="Probability & Statistics I"  activeDot={{ onClick: (event, payload) =>  passData(payload) }} />
  </LineChart>
    
    </>
    
  );

  return (
    <div>
    {pureMathsData.length > 0 || probStatsData.length > 0 ? renderLineChart : <p>Loading chart...</p>}
    {/* ... additional code */}
  </div>
  );
};

export default Displaygraph;
