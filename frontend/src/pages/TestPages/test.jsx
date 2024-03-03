import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const App = () => {
  const minuteSeconds = 60;
  const hourSeconds = 3600;

  const timerProps = {
    isPlaying: true,
    size: 120,
    strokeWidth: 6,
  };

  const renderTime = (dimension, time) => {
    return (
      <div className="time-wrapper">
        <div className="time">{time}</div>
        <div>{dimension}</div>
      </div>
    );
  };

  const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
  const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
  const getTimeHours = (time) => (time / hourSeconds) | 0;

  const stratTime = Date.now() / 1000;
  const endTime = stratTime + 10;

  const remainingTime = endTime - stratTime;
  const hours = Math.round(remainingTime / hourSeconds);

  return (
    <div className="App">
      {remainingTime > hourSeconds && (
        <CountdownCircleTimer
          {...timerProps}
          colors="#D14081"
          duration={hourSeconds}
          initialRemainingTime={hours}
          onComplete={(totalElapsedTime) => ({
            shouldRepeat: remainingTime - totalElapsedTime > hourSeconds,
            // Check for any remaining time
          })}
        >
          {({ remainingTime, color }) => (
            <span style={{ color }}>
              {renderTime("hours", getTimeHours(remainingTime))}
            </span>
          )}
        </CountdownCircleTimer>
      )}

      {remainingTime > minuteSeconds && (
        <CountdownCircleTimer
          {...timerProps}
          colors="#EF798A"
          duration={hourSeconds}
          initialRemainingTime={remainingTime % hourSeconds}
          onComplete={(totalElapsedTime) => ({
            shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds,
          })}
        >
          {({ elapsedTime, color }) => (
            <span style={{ color }}>
              {renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>
      )}

      <CountdownCircleTimer
        {...timerProps}
        colors="#218380"
        duration={minuteSeconds}
        initialRemainingTime={remainingTime % minuteSeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > 0,
        })}
        children={({ remainingTime }) => {
          <>{remainingTime == 0 && <p>Time is up</p>}</>;
        }}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("seconds", getTimeSeconds(elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
    </div>
  );
};

export default App;
