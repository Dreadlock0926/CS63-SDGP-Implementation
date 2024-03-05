/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { FetchMaterial } from "../Api/Api";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Materials from "./Materials";
import NotLogged from "../NotLogged";
import "./Learn.css";

const Learn = () => {
  const { loading, setLoading, logged } = useContext(UserContext);


  return logged ? (
    <div className="learn-container">
      <header className="header">
        <h1>Learning Resources</h1>
      </header>
      <div className="subjects-container">
        <Link to="/learning-pure" className="subject-link">
          <div className="subject">
            <h2>Pure Mathematics 1</h2>
            <p>Explore pure mathematics topics</p>
          </div>
        </Link>
        <Link to="/learning-stat" className="subject-link">
          <div className="subject">
            <h2>Statistics</h2>
            <p>Discover statistical concepts and methods</p>
          </div>
        </Link>
      </div>
      <Button className="add-resources-btn">
        <Link to="/addresources" className="link">
          Add Learning Resources
        </Link>
      </Button>
    </div>
  ) : (
    <NotLogged />
  );
};

export default Learn;
