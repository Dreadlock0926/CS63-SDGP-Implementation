import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const ExamCountDown = ({examType, onComplete}) => {
  // the value gets passed as an object and not a string so it is accessing the examType field here
  const minuteSeconds = 60;
  const hourSeconds = 3600;

  // timer props define the size of the timer and the stroke width
  const timerProps = {
    isPlaying: true,
    size: 120,
    strokeWidth: 6,
  };

  const startTime = Date.now() / 1000;

  let examDuration;

  switch (examType) {
    case "p1":
      examDuration = 5400;
      break;

    case "s1":
      examDuration = 1;
      break;
  }
  const endTime = startTime + examDuration;

  const remainingTime = endTime - startTime;

  const formatTime = ({ remainingTime }) => {
    const hours = Math.floor(remainingTime / hourSeconds);
    const minutes = Math.floor((remainingTime % hourSeconds) / minuteSeconds);
    const seconds = remainingTime % minuteSeconds;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="App">
      <CountdownCircleTimer
        {...timerProps}
        colors="#218380"
        duration={remainingTime}
        //define here what to do when the timer is complete
        onComplete={() => onComplete()}
        children={formatTime}
      ></CountdownCircleTimer>
    </div>
  );
};

export default ExamCountDown;
