/* eslint-disable no-unused-vars */


const Finalized = () => {

    const marks = localStorage.getItem("marks")
    const progressOvertime = [];
    

    if(!marks){
        return (
            <div>Exam records not found! Please try again!</div>
        )
    }else{
        console.log(`Your marks today are ${marks}`);
        progressOvertime.push(marks)
  
    }

    function OvertimeRecords() {
        for (let i = 0; i < progressOvertime.length; i++) {
            let todayProgress = progressOvertime[progressOvertime.length - 1] - progressOvertime.slice(0,-1);
            console.log(`The overtime records are ${todayProgress}`);
            return todayProgress;
        }
    }
    
    
    OvertimeRecords();
 
  return (
    <div style={{textAlign:"center"}}><h1>Finalized</h1><p>{`${OvertimeRecords() !== 0  ? `Congrats you've made ${OvertimeRecords()} progress today!` : "Seems like there's no new progress today , better luck next time!"}`}</p></div>
  )
}

export default Finalized