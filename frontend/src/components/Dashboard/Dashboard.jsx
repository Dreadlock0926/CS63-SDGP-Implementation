/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const datax = useContext(UserContext);
  const { user, rank, loading, setLoading } = datax;

  const [progress, setProg] = useState({
    //how we're going to predict this is something we still need to think about
    statistics: 75,
    puremaths: 50,
  });
  const [time, setTime] = useState("");

//   async function userProgress() {
//     try {
//       setLoading(true);
//       const userData = await Axios.get("http://localhost:8000/users"); //backend route not created!
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }

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

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{`${time},${user}`} </h2>
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
            <p>{statistics}% complete</p>
            <button>
              <Link to="/stat">Continue</Link>
            </button>
          </div>
          <div className="pureProg">
            <h1>Pure Maths 1</h1>
            <p>{puremaths}% complete</p>
            <button>
              <Link to="/puremath">Continue</Link>
            </button>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Dashboard;
