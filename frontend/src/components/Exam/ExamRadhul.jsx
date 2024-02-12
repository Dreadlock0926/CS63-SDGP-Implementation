import React, { useState, useEffect, useRef } from "react";
import "./ExamRadhul.css";
import ReactDOM from "react-dom/client";
import Countdown from "react-countdown";
import { zeroPad } from "react-countdown";

const ExamBody = () => {
  return <div className="examBody">asdasd</div>;
};

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span>00:00:00</span>;
  } else {
    // Render a countdown
    return (
      <span>
        {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    );
  }
};

const Radhul = () => {
  const root = useRef(null); // Create a ref to store the root

  useEffect(() => {
    if (root.current === null) {
      root.current = ReactDOM.createRoot(document.getElementById("exam-timer"));
      root.current.render(
        <Countdown date={Date.now() + 100000} renderer={renderer} />
      );
    }
  }, []);

  return (
    <div className="examContainer">
      <div className="examHeader">
        <h1 id="examTitle">Exam Title</h1>
        <div id="exam-timer"></div>
      </div>
      <ExamBody />
    </div>
  );
};

export default Radhul;
