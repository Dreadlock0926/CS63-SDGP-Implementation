/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Axios from "axios";
import { useEffect } from "react";

//im just making a small mock idea on how to track  progress overtime!

const Finalized = () => {

    const marks = localStorage.getItem("marks")
    const progressOvertime = [];
      progressOvertime.push(marks)
 
    async function UpdateNewProgress(){
        try{
            const data = await Axios.post("http://localhost:8000/progress",{progress:OvertimeRecords()})
            if(data.status===200){
                console.log("Added new records!");
            }else{
                console.log("Couldn't add new records!");
            }
        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        UpdateNewProgress();
    },[UpdateNewProgress()])
    



    function OvertimeRecords() {
        for (let i = 0; i < progressOvertime.length; i++) {
            let todayProgress = progressOvertime[progressOvertime.length - 1] - progressOvertime.slice(0,-1);
            console.log(`The overtime records are ${todayProgress}`);
            return todayProgress;
        }
    }
    


    
 
  return (
    <div style={{textAlign:"center"}}>
        <h1>Finalized</h1>
        <p>{`${OvertimeRecords() !== 0  ? `Congrats you've made ${OvertimeRecords()} progress today!` : "Seems like there's no new progress today , better luck next time!"}`}</p>
        </div>
  )
}

export default Finalized