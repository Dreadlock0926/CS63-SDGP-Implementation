/* eslint-disable no-unused-vars */
// import "./App.css";
import "//unpkg.com/mathlive";
import { useState } from "react";

function MathLive() {
  const [value, setValue] = useState("");


  async function answerStore(){
    //could implement some logic to store the value of the answer 
    alert("How are ya?")
  }

  return (
    <div className="MathLive">
      <math-field onInput={(evt) => setValue(evt.target.value)}>
  
      </math-field>
      <button onClick={answerStore}>Next!</button>
      <p>Value: {value} Latex</p>
    </div>
  );
}

export default MathLive;
