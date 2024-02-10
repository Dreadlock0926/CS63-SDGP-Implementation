import React, { useState, useEffect } from "react";
import "./ExamRadhul.css";

function ExamTimer() {
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [timeLeft, setTimeLeft] = useState(10); // Initial time in seconds

  useEffect(() => {
    if (isTimerRunning) {
      let intervalId;
      intervalId = setInterval(() => {
        if (timeLeft == 0) {
          clearInterval(intervalId);
          setIsTimerRunning(false);
        }
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isTimerRunning]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const display = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <div>
      <div id="timerDisplay">{display}</div>
    </div>
  );
}

const Radhul = () => {
  return (
    <div className="examHeader">
      <h1 className="examTitle">Dasd</h1>
      <ExamTimer />
    </div>
  );
};

export default Radhul;
