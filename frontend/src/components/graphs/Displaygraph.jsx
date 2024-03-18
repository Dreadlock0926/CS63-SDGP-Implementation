import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const Displaygraph = () => {
  // Use local state to store the chart data
  const [chartData, setChartData] = useState([]);
  const {testedPureProgress,setPureTestedProgress} = useContext(UserContext);

  // You're already using useContext here, ensure that it provides 'id'
  const id = localStorage.getItem('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8000/progression/get/marks", { useRef: id });
        console.log(response)
        
        // Process the fetched data and calculate percentages
        const processedData = response.data.map((item, index) => ({
          name: `Exam ${index + 1}`, // Assuming you want to label exams numerically
          percentage: (item.mark / item.totalMark) * 100
        }));

        const totalOfTotalMarks = response.data.reduce((acc, current) => acc + current.totalMark, 0);
        const marks = response.data.reduce((acc,current)=>acc+current.mark,0);

        console.log('Sum of total marks:', marks);


        const averageMarks = Math.round(100*(marks/totalOfTotalMarks),3);
        setPureTestedProgress(averageMarks);
        // Set the processed data to the local state
        setChartData(processedData);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]); // Only re-run the effect if 'id' changes

  // Render the LineChart with the data from state
  const renderLineChart = (
    <LineChart width={600} height={300} data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="percentage" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );

  return (
    <div>
      {chartData.length > 0 ? renderLineChart : <p>Loading chart...</p>}
      <h5>The total maths marks are : {testedPureProgress}</h5>
    </div>
  );
};

export default Displaygraph;
