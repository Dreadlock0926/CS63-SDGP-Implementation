/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import {UserContext} from "../../App"
import Axios from "axios";
import NotLogged from "../NotLogged"


const Learn = () => {


    const {setLoading,loading,log } = useContext(UserContext)
    const [resources,setResources] = useState([])

    async function fetchResources(){
        try{
            setLoading(true);
            await Axios.get("").then((response)=>{if(response.status===200){setResources(response.data)}}) //path not given yet!

        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchResources();
    },[])


    async function scopedSelection(e){
        e.preventDefault();
        try{
            setLoading(true);
            await Axios.get("").then((response)=>{if(response.status===200){setResources(response.data)}}) //path not given yet!

        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }









    return loading ? (
        "Loading..."
      ) : log ? (
        <div>
          <h1>Learn</h1>
          <p>{JSON.stringify(resources)}</p>
          <form onSubmit={scopedSelection}>
            <span>
              <label>Topic</label>
              <input name="topicname" type="checkbox"></input>
            </span>
          </form>
        </div>
      ) : (
        <NotLogged />
      );
      
}

export default Learn