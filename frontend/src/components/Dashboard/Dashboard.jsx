/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const Dashboard = () => {
  const { log, user, setLoading, loading, setStatus } = useContext(UserContext);
  const [data, setData] = useState([]);

  const BASE = "http://localhost:8000/forum";

  async function fetchProgress() {
    try {
      setLoading(true);
      const response = await Axios.get(BASE);
      if (response.status === 200) {
        setStatus("Fetched");
        setData(response.data);
      } else {
        setStatus("Error while fetching!");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error while fetching!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProgress();
  }, []);

  const [time, setTime] = useState("");

  useEffect(() => {
    const today = new Date();
    const hours = today.getHours();

    if (hours < 12) {
      setTime("Good Morning!");
    } else if (hours < 17) {
      setTime("Good Afternoon!");
    } else if (hours < 20) {
      setTime("Good Evening!");
    } else {
      setTime("Seems like it's late out here 🌚");
    }
  }, []);

  const chartData = data.map((x) => ({ name: x.name, value: x.rating }));

  const { statistics, puremaths } = data.reduce(
    (acc, x) => {
      acc.statistics += x.statistics || 0;
      acc.puremaths += x.puremaths || 0;
      return acc;
    },
    { statistics: 0, puremaths: 0 }
  );

  return log ? (
    <div>
      <h1>{`${time}, ${user.username}`}</h1>
      <h1>Dashboard</h1>
      <LineChart width={500} height={300} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>

      <div className="progress">
        <label>
          <div className="stateProg">
            <h1>Statistics</h1>
            {/* <p>{`${statistics}% complete`}</p> */}
            <p>25% complete!</p>
            <button>
              <Link to="/stat">Continue</Link>
            </button>
          </div>
          <br></br>
          <div className="pureProg">
            <h1>Pure Maths 1</h1>
            {/* <p>{`${puremaths}% complete`}</p> */}
            <p>42% complete!</p>
            <button>
              <Link to="/puremath">Continue</Link>
            </button>
          </div>
        </label>
      </div>
    </div>
  ) : (
    <div>
      <h1>Please <Link to="/login">login</Link> to continue!</h1>
    </div>
  );
};

export default Dashboard;
