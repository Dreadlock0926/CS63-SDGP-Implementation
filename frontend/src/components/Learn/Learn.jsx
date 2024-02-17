/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { FetchMaterial } from "../Api/Api";
import { Link } from "react-router-dom";
import Materials from "./Materials";
import "./Learn.css";

const Learn = () => {
  const { loading, setLoading, logged } = useContext(UserContext); // Removed unnecessary properties from destructuring
  const [resources,setResources] = useState([])

  const fetchMaterial = async () => {
    try {
      setLoading(true);
      const resources = await FetchMaterial();
      console.log(resources); // fine up to this point!
      setResources(resources);
      console.log(`The data in resources ${JSON.stringify(resources)}`);
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
    <div style={{fontFamily:"poppins"}}>
      <h1>Learning Resources 📔</h1>
      {logged ? (
        <div className="container">
          {loading ? (
            <p className="loading-message">Loading...</p>
          ) : resources && resources.length ? (
            resources.map((x) => <div key={x._id}><Materials key={x._id} data={x} thekey={x._id} /></div>)
          ) : (
            <div className="no-materials-message">
              <h1>No materials added yet!</h1>
            </div>
          )}
        </div>
      ) : (
        <div>Please <Link to="login">Login</Link> to Access Learning Resources!</div>
      )}
      <Link to="/learning-pure">Pure Mathematics 1</Link><br/><Link to="/learning-stat">Statistics</Link>
      <Link to="/addresources" className="link">
            Add Learning Resources 🤓
          </Link>
    </div>
  );
};

export default Learn;
