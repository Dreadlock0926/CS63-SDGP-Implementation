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
  const [data, setData] = useState([]);

  const fetchMaterial = async () => {
    try {
      setLoading(true);
      const resources = await FetchMaterial();
      console.log(resources); // fine up to this point!
      setData(resources);
      console.log(`The data in ${JSON.stringify(resources)}`);
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
          ) : data && data.length ? (
            data.map((x) => <Materials key={x._id} data={x} />)
          ) : (
            <div className="no-materials-message">
              <h1>No materials added yet!</h1>
            </div>
          )}
        </div>
      ) : (
        <div className="container">
          <h1>No results found!</h1>
        </div>
      )}
      <Link to="/addresources" className="link">
            Add Learning Resources 🤓
          </Link>
    </div>
  );
};

export default Learn;
