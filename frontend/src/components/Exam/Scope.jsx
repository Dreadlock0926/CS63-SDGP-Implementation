/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import {UserContext} from "../../App"
import Axios from "axios";

const Scope = () => {

    const {loading,setLoading} = useContext(UserContext)
    const [topic,setTopic] = useState({})


    async function SelectScope(e) {
        e.preventDefault();
        try{
            setLoading(true);
            const data = await Axios.post("",topic);
            if(data.status===200){
                alert("Success!")
            }else{
                alert("Error while getting data back!")
            }
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    }



  return (
    <div><form onSubmit={SelectScope}><select><option value="all">All</option><option value="one">First</option><option value="two">Two</option><option value="three">Three</option></select><button type="submit">Select!</button></form></div>
  )
}

export default Scope