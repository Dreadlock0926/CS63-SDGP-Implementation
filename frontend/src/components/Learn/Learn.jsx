/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState,useCallback } from "react";
import { UserContext } from "../../App";
import {  FetchMaterial } from "../Api/Api";
import { Link } from "react-router-dom";
import Materials from "./Materials";
import "./Learn.css";

const Learn = () => {
  const { loading, setLoading, logged } = useContext(UserContext); // Removed unnecessary properties from destructuring
  const [data,setData] = useState([])
  const [resources,setResources] = useState("")

  const fetchMaterial = async () => {
    try {
      setLoading(true);
      const resources = await FetchMaterial(); 
      console.log(resources); //fine upto this point!
      setData(resources) //not saving!
      console.log(`The data in ${JSON.stringify(data)}`)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterial();
  }, []);

  



  return logged ? (
    <div className="container">
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : data && data.length ? (
        data.map((x) => <Materials key={x._id} data={x} />)
      ) : (
        <div className="no-materials-message"><h1>No materials added yet!</h1></div>
      )}
      <Link to="/addresources" className="link">Add Learning Resources 🤓</Link>
    </div>
  ) : (
    <div className="container"><h1>No results found!</h1></div>
  );
};

export default Learn;
