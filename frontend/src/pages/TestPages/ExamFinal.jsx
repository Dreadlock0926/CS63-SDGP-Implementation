/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import QuestionComponent from "../../components/QuestionComponent/QuestionComponent";

// import { UserContext } from "../../App";

const ExamFinalized = () => {
  const examData = sessionStorage.getItem("examData");

  if (examData) {
    console.log(examData);
  } else {
    window.location.href = "/scope";
  }

  //might have to use some local storage approach for this

  return (
    <div>
      {examData ? (
        <div>
          <h1>Exam</h1>
          <div>
            {JSON.parse(examData).map((question, index) => {
              return (
                <div>
                  <QuestionComponent
                    key={question.questionID}
                    question={question}
                    mqNum={index + 1}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <h1>No exam data found</h1>
          <Link to="/scope">Go back to scope</Link>
        </div>
      )}
    </div>
  );
};

export default ExamFinalized;
