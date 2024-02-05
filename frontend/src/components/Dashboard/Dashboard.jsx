/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";


const Dashboard = () => {
const {log,setLog,user,setLoading,loading,setStatus} = useContext(UserContext)
const [data,setData] = useState([])

const BASE = "http://localhost:8000/forum"

  async function FetchProgress(){
    try{
      setLoading(true);
      const data = await Axios.get(BASE);
      if(data.status===200){
        setStatus("Fetched")
        setData(data.data)
      }else{
        setStatus("Error while fetching!")
      }
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    FetchProgress();
  },[])

  const [progress, setProg] = useState({
    statistics: 75,
    puremaths: 50,
  });
  const [time, setTime] = useState("");

  const today = new Date();
  const hours = today.getHours();

  useEffect(() => {
    if (hours < 12) {
      setTime("Good Morning!");
    } else if (hours < 17) {
      setTime("Good Afternoon!");
    } else if (hours < 20) {
      setTime("Good Evening!");
    } else {
      setTime("Seems like it's late out here 🌚");
    }
  }, [hours]);

  const { statistics, puremaths } = progress;

  const chartData = [
    {  value: 40 },
    {  value: 20 },
    {  value: 70 },
    {  value: 60 },
    {  value: 80 },
    {  value: 35 },
    {  value: 23 },
  ];

  return log?<div>
      <h1>{`${time}, ${user.username}`}</h1>
  <h1>Dashboard</h1>
  <LineChart
    width={500}
    height={300}
    data={chartData}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
  >
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="value" stroke="#8884d8" />
  </LineChart>

  <div className="progress">
    <label>
      <div
        className="stateProg"
        style={{
          width: "100px",
          height: "100px",
          padding: "2%",
        }}
      >
        <h1>Statistics</h1>
        <p>{progress.statistics}% complete</p>
        <button>
          <Link to="/stat">Continue</Link>
        </button>
      </div>
      <div className="pureProg">
        <h1>Pure Maths 1</h1>
        <p>{progress.puremaths}% complete</p>
        <button>
          <Link to="/puremath">Continue</Link>
        </button>
      </div>
    </label>
  </div>
</div>:<div><h1>Please <Link to="/login">login</Link> to continue!</h1></div>;
};

export default Dashboard;
