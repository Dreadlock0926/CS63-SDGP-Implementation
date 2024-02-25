/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const Finalized = () => {
    const { user, setUser } = useContext(UserContext);
    const [progressOvertime, setProgressOvertime] = useState([]);

    useEffect(() => {
        previousRecords();
    }, []);

    async function previousRecords() {
        try {
            const response = await Axios.get("http://localhost:8000/progress");
            if (response.status === 200) {
                setProgressOvertime(response.data);
            } else {
                console.log("No response!");
            }
        } catch (err) {
            console.error(err);
        }
    }

    const [index,setIndex] = useState(0)
    const theIDs = progressOvertime.forEach((x)=>x.topicKeys);
    if(theIDs==="rod"){
        setIndex(0);
    }else if(theIDs==="pac"){
        setIndex(1);
    }else if(theIDs==="p"){
        setIndex(2);
    }else if(theIDs==="drv"){
        setIndex(3);
    }else if(theIDs==="tnd"){
        setIndex(4);
    }


    useEffect(() => {
        const marks = localStorage.getItem("marks");
        if (marks !== null) {
            const updatedProgress = [...progressOvertime, marks];
            setProgressOvertime(updatedProgress);
            UpdateNewProgress(updatedProgress);
        }
    }, []);

    function OvertimeRecords() {
        if (progressOvertime.length < 2) {
            return 0; 
        }
        const todayProgress = progressOvertime[progressOvertime.length - 1] - progressOvertime[0];
        console.log(`The overtime records are ${todayProgress}`);
        return todayProgress;
    }

    async function UpdateNewProgress(updatedProgress) {
        try {
            const data = await Axios.post("http://localhost:8000/progress", { progress: updatedProgress });
            if (data.status === 200) {
                console.log("Added new records!");
            } else {
                console.log("Couldn't add new records!");
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Finalized</h1>
            <p>
                {OvertimeRecords() !== 0
                    ? `Congrats you've made ${OvertimeRecords()} progress today!`
                    : "Seems like there's no new progress today, better luck next time!"}
            </p>
        </div>
    );
};

export default Finalized;
