/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import {UserContext} from "../../App"
import Axios from "axios";

const Tracking = () => {

    const {data,setData}  = useContext(UserContext)

    const findAboutUser = async ()=>{
        try{
            const response = await Axios.get("http://localhost:8000/progression/get")
            if(response.status===200){
                setData(response.data)
            }else{
                alert("No data received!")
            }
        }catch(err){
            console.error(err);
        }
    }

   useEffect(()=>{

   })


  return (
    <div>
        <h1>Tracking</h1>
    <p>{data && data.length && data.voxalPoints? JSON.stringify(data)  : "No data found"}</p>
    </div>
  )
}

export default Tracking