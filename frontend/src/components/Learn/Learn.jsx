/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { FetchMaterial } from "../Api/Api";
import { Link } from "react-router-dom";
import {Button} from "@mui/material"
import Materials from "./Materials";
import NotLogged from "../NotLogged"
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

  return logged? (
    <div style={{fontFamily:"poppins"}}>
            <h1>Learning Resources 📔</h1>
      <Link to="/learning-pure">Pure Mathematics 1</Link><br/><Link to="/learning-stat">Statistics</Link>
      <br/>
    <Button>  <Link to="/addresources" className="link">
            Add Learning Resources 🤓
          </Link></Button>
          <br/>
    </div>
  ) : <NotLogged/>;
};

export default Learn;
