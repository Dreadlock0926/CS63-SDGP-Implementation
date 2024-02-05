/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import { UserContext } from "../../App";


const HomePage = () => {
  const { user,log,test } = useContext(UserContext);
  const [time, setTime] = useState("day");
  const [userx, setUser] = useState([]);

  // async function GetProgress() {
  //   try {
  //     const r = await Axios.get("http://localhost:8000/users"); //route not made yet!(backend)
  //     setUser(r.data); //let's use the context api rather than passing it down like props!
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();

    if (hour < 12) {
      setTime("Morning");
    } else if (hour < 15) {
      setTime("Afternoon");
    } else {
      setTime("Evening");
    }
  }, []);

  // useEffect(() => {
  //   GetProgress();
  // }, []);

  return log ? (
    <div>
      <h1>
        Good {time} , Welcome Back {user.username}!
      </h1>
      <h1>Resume where you left off</h1>
      <h1>Pure Math</h1>
      <Link to="/puremath">
        <button>Pure Math</button>  
      </Link>
      <br/><br/>
      <h1>Statistics</h1>
      <Link to="/puremath">
        <button>Statistics</button>  
      </Link>
      <div className="math">
        <div>
          <p>
            {userx && userx.length
              ? userx.map((x) => <div key={x.id}><p>{`Progress ${x.marks}`}</p></div>)
              : ""}
          </p>
        </div>

        <div>
          <h1>Forum</h1>
          <Link to="/forum">
            <button>forum</button>
          </Link>
        </div>
      </div>
      <Link to="/dash">Dashboard</Link>
    </div>
  ) : (
    <div>
      <div className="container-fluid">
        <h1>Good {time}! Welcome to NerdJax</h1>
        <h2 style={{ margin: "5%" }}>
          Our platform hopes to help you improve your maths skills, with the
          help of personalized learning ✨. So join us on this adventure to ace
          your A-Levels like a Champ 🏆
        </h2>
        <button>
          <Link to="/login">
            What you waiting for ? Click here to get started! 🏆🥂
          </Link>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
