/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { FetchMaterial } from "../Api/Api";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import NotLogged from "../NotLogged";
import "./Learn.css";

const Learn = () => {
  const { loggedInUser, setLoggedInUser, loading, logged, theTopic, setTheTopic } =
    useContext(UserContext);

    useEffect(() => {
      console.log("The logged user");
      // console.log(sessionStorage.getItem("loggedUser"));
      setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedUser")).data);
    }, [])

    useEffect(() => {
      if (Object.keys(loggedInUser).length > 0) {
        console.log(loggedInUser);
      }
    }, [loggedInUser])

  return Object.keys(loggedInUser).length > 0 && !loading ? (
    <div className="learn-container">
      <header className="header">
        <h1>Learning Resources</h1>
      </header>
      <div className="subjects-container">
        <Link
          to="/learnprint"
          className="subject-link"
          onClick={()=>{if(theTopic!==""){setTheTopic("")}setTheTopic("Pure")}}
        >
          <div className="subject">
            <h2>Pure Mathematics 1</h2>
            <p>Explore pure mathematics topics</p>
          </div>
        </Link>
        <Link
          to="/learnprint"
          className="subject-link"
          onClick={()=>{if(theTopic!==""){setTheTopic("")}setTheTopic("Stat")}}
        >
          <div className="subject">
            <h2>Statistics</h2>
            <p>Discover statistical concepts and methods</p>
          </div>
        </Link>
      </div>
    </div>
  ) : (
    <NotLogged />
  );
};

export default Learn;
