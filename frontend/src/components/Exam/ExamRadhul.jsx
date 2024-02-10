import React, { useState, useEffect } from "react";
import "./ExamRadhul.css";

function ExamTimer() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // Initial time in seconds

  useEffect(() => {
    let intervalId;

    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => Math.max(0, prevTimeLeft - 1)); // Decrement time, ensuring non-negative
      }, 1000);
    }

    // Cleanup function to clear the interval on unmount or when `isTimerRunning` changes
    return () => clearInterval(intervalId);
  }, [isTimerRunning]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const display = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const handleStartStop = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  return (
    <div>
      <button onClick={handleStartStop}>
        {isTimerRunning ? "Stop Timer" : "Start Timer"}
      </button>
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
