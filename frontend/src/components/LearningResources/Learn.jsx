/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";    
import { AddMaterial, FetchMaterial } from "../Api/Api";
import { Link } from "react-router-dom";
import Materials from "./Materials";


const Learn = () => {
  const { loading, setLoading, status, setStatus } = useContext(UserContext);
  const [material, setMaterial] = useState([]);
  const [data, setData] = useState({
    topic: "",
    title: "",
    about: "",
    subtopic: "",
  });

  const fetchMaterial = async () => {
    try {
      setLoading(true); //there's an issue here!

      const resources = await FetchMaterial();
      setMaterial(resources);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterial();
  }, []);

  return (
    <div>
      <h1>Learn Page!</h1>
      <div>
        {loading ? (
          "Loading..."
        ) : material && material.length ? (
          material.map((x) => <Materials key={x._id} data={x} />)
        ) : (
          <h1>No materials added yet!</h1> //we can edit the questions from here!
        )}
      </div>
      <Link to="/addresources">Add Learning Resources 🤓</Link>
    </div>
  );
};

export default Learn;
