/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { CircularProgressbar } from "react-circular-progressbar";
import "./Progressionmark.css";
import { useNavigate } from "react-router-dom";

function Progressionmark() {
  const navigator = useNavigate();
  const progressBarStyle = {
    // Set a smaller width and height for the progress bar container
    width: "100px",
    height: "100px",
  };

  // Use local state to store the chart data

  const [clickedPoint, setClickedPoint] = useState(null);
  const [pureMathsData, setPureMathsData] = useState([]);
  const [probStatsData, setProbStatsData] = useState([]);
  const {
    totalMarks,
    setTotalMarks,
    voxalPoints,
    loggedInUser,
    setLoggedInUser,
  } = useContext(UserContext);

  const CustomTooltip = ({ active, payload, label }) => {
    // eslint-disable-next-line react/prop-types
    if (active && payload && payload.length) {
      // eslint-disable-next-line react/prop-types
      const data = payload[0].payload; // Assuming the payload structure, you may need to adjust this

      // We use a mouse event here to capture the click and update the clickedPoint state
      const handleTooltipClick = () => {
        // eslint-disable-next-line react/prop-types
        setClickedPoint({ examNumber: data.name, mark: data.percentage });
        // eslint-disable-next-line react/prop-types
        console.log(`Clicked on ${data.name} with mark ${data.percentage}`);
        console.log(clickedPoint);
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

  const passData = (payload) => {
    console.log(payload.payload.id);
    const examId = payload.payload.id;
    navigator(`/exam-review/${examId}`);
  };

  // You're already using useContext here, ensure that it provides 'id'
  const id = localStorage.getItem("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/progression/get/marks",
          { useRef: id }
        );
        console.log(response);
        setLoggedInUser(response);

        // Process the fetched data and calculate percentages

        const totalOfTotalMarks = response.data.reduce(
          (acc, current) => acc + current.totalMark,
          0
        );
        const marks = response.data.reduce(
          (acc, current) => acc + current.mark,
          0
        );

        const pureMathsarray = response.data
          .filter((item) => item.examModule === "Pure Mathematics I")
          .map((item, index) => ({
            name: `Exam ${index + 1}`, // Assuming you want to label exams numerically
            percentage: (item.mark / item.totalMark) * 100,
            id: item._id,
          }));

        const statArray = response.data
          .filter((item) => item.examModule === "Probability & Statistics I")
          .map((item, index) => ({
            name: `Exam ${index + 1}`, // Assuming you want to label exams numerically
            percentage: (item.mark / item.totalMark) * 100,
            id: item._id,
          }));

        console.log("Sum of total marks:", marks);

        const averageMarks = Math.round(100 * (marks / totalOfTotalMarks), 2);

        setTotalMarks(averageMarks);
        // Set the processed data to the local state
        setPureMathsData(pureMathsarray);
        setProbStatsData(statArray);

        console.log(pureMathsarray);
        console.log(statArray);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id, setTotalMarks]); // Only re-run the effect if 'id' changes

  // Render the LineChart with the data from state
  const renderLineChart = (
    <>
      <LineChart
        width={600}
        height={300}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        {/* Line for Pure Mathematics I */}
        <Line
          type="monotone"
          dataKey="percentage"
          data={pureMathsData}
          stroke="#8884d8"
          name="Pure Mathematics I"
          activeDot={{ onClick: (event, payload) => passData(payload) }}
        />
        {/* Line for Probability & Statistics I */}
        <Line
          type="monotone"
          dataKey="percentage"
          data={probStatsData}
          stroke="#82ca9d"
          name="Probability & Statistics I"
          activeDot={{ onClick: (event, payload) => passData(payload) }}
        />
      </LineChart>
    </>
  );

  return (
    <div>
      {pureMathsData.length > 0 || probStatsData.length > 0 ? (
        renderLineChart
      ) : (
        <p>Loading chart...</p>
      )}
      {/* ... additional code */}
    </div>
  );
}

export default Progressionmark;
