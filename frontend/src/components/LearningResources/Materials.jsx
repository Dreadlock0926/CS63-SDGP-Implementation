/* eslint-disable react/prop-types */

import { useContext } from "react";
import { UserContext } from "../../App";
import NotLogged from "../NotLogged";

/* eslint-disable no-unused-vars */
const Materials = (props) => {
  const {logged} = useContext(UserContext)
    const { key, data } = props;
  
    return logged?
      <div key={key} style={{margin:"5%"}}>
        <h1>Topic - {data.topic}</h1>
        <h2>Title - {data.title}</h2>
        <h3>About - {data.about}</h3>
        <h4>Under subtopic - {data.subtopic}</h4>
      </div>
    :<NotLogged/>
  };
  
  export default Materials;
  