import { useContext, useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { UserContext } from "../../App";
import "./Progressionmark.css";

function Progressionmark() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const [totalMark, setTotalMark] = useState(0);
  const [totalStatMarks, setTotalStatMarks] = useState(0);
  const [average, setAverage] = useState(0);
  const [chartData, setChartData] = useState([]);

  function calculation(data) {
    const mathsMarks = data.testHistory.Maths;
    const statMarks = data.testHistory.Statistics;

    if (mathsMarks.length >= statMarks.length) {
      const transFormData = mathsMarks.map((mark, index) => ({
        testNumber: index + 1,
        Maths: mark,
        Statistics: statMarks[index] || 0,
      }));
      setChartData(transFormData);
    } else {
      const transFormData = statMarks.map((mark, index) => ({
        testNumber: index + 1,
        Statistics: mark,
        Maths: mathsMarks[index] || 0,
      }));
      setChartData(transFormData);
    }

    if (data && data.testHistory && data.testHistory.Maths) {
      const totalMathsMarks = data.testHistory.Maths.reduce(
        (acc, currentMark) => acc + currentMark,
        0
      );
      const averageMathsMarks = Math.round(
        totalMathsMarks / data.testHistory.Maths.length
      );
      setTotalMark(totalMathsMarks);
      setAverage(averageMathsMarks);
    }

    if (data && data.testHistory && data.testHistory.Statistics) {
      const totalStatMathMarks = data.testHistory.Statistics.reduce(
        (acc, currentMark) => acc + currentMark,
        0
      );
      const averageStatMarks = Math.round(
        totalStatMathMarks / data.testHistory.Statistics.length
      );
      setTotalStatMarks(averageStatMarks);
    }
  }

  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedUser")).data);
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      calculation(loggedInUser);
    }
  }, [loggedInUser]);

  const renderLineChart = (
    <LineChart
      width={500}
      height={350}
      data={chartData}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="Maths" stroke="#8884d8" />
      <Line type="monotone" dataKey="Statistics" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="testNumber" />
      <YAxis />
    </LineChart>
  );

  return (
    <div>
      {loggedInUser ? (
        <div className="progress-container">
          <div className="avg-mark-container">
            <p>Average Mathematics Mark</p>
            <h2>{average}</h2>
            <br />
            <p>Average Statistics Mark</p>
            <h2>{totalStatMarks}</h2>
          </div>
          <div>{renderLineChart}</div>
        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default Progressionmark;
