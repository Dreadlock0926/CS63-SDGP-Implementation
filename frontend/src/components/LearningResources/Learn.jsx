/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { AddMaterial, FetchMaterial } from "../Api/Api";
import { Link } from "react-router-dom";
import Materials from "./Materials";

const Learn = () => {
  const { loading, setLoading, logged } = useContext(UserContext); // Removed unnecessary properties from destructuring
  const [data,setData] = useState([])
  const [user, setUser] = useState({
    topic: "",
    title: "",
    about: "",
    subtopic: "",
  });

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
    <div>
      {loading ? (
        "Loading..."
      ) : data && data.length ? (
        data.map((x) => <Materials key={x._id} data={x} />)
      ) : (
        <h1>No materials added yet!</h1>
      )}
      <Link to="/addresources">Add Learning Resources 🤓</Link>
    </div>
  ) : (
    <div><h1>No results found!</h1></div>
  );
};

export default Learn;
