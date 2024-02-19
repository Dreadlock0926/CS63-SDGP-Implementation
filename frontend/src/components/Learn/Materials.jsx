/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useContext } from "react";
import { UserContext } from "../../App";
// import NotLogged from "../NotLogged";
import { Link } from "react-router-dom";

/* eslint-disable no-unused-vars */
const Materials = ({data,thekey}) => {

    
  
    
  
    return (  <div key={thekey} style={{margin:"5%"}}>
    <h1>Topic - {data.topic}</h1>
    <h2>Under {data.title}</h2>
    <h3> {data.about ? data.about : ""}</h3>
    <h4> {data.subtopic ? data.subtopic :" "}</h4>
  </div>)
    
  };
  
  export default Materials;
  