/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import QuestionComponent from "../../components/QuestionComponent/QuestionComponent";

// import { UserContext } from "../../App";

const ExamFinalized = () => {
  const examData = sessionStorage.getItem("examData");

  if (examData) {
  } else {
    window.location.href = "/scope";
  }

  //might have to use some local storage approach for this

  // getting answers

  let answerValues = [];
  let correctAnswers = [];
  let wrongAnswersIndex = [];
  let wrongQuestions = [];

  const getAnswers = () => {
    const answers = document.querySelectorAll(".answer-input");
    answerValues = Array.from(answers).map((answer) => answer.value);
    console.log("This is what the user inputted for the answers:", answerValues);

    correctAnswers = [];
    JSON.parse(examData).forEach(question => {
        question.answersGrid.forEach(answer => {
            if (answer !== "") {
                correctAnswers.push(answer);
            }
        }) 
    });
    console.log("These are the correct answers:", correctAnswers);
    compareAnswers();
    addWrongAnswers();
};

const compareAnswers = () => {
    wrongAnswersIndex = [];
    for (let i = 0; i < correctAnswers.length; i++) {

        if (answerValues[i] !== correctAnswers[i]) {
            wrongAnswersIndex.push(i);
        }
        
    }
    console.log("these are the index of the wrong answers", wrongAnswersIndex);
};

const addWrongAnswers = () => {

    let count = -1;
    wrongQuestions = [];

    JSON.parse(examData).forEach(question => {
        question.answersGrid.forEach(answer => {
            if (answer !== "") {
                count += 1;
            }
            if (wrongAnswersIndex.includes(count) && (!wrongQuestions.includes(question.questionID))) {

                wrongQuestions.push(question.questionID);

            }
        }) 
    });

    console.log("these are the IDs of the wrong questions", wrongQuestions);

};

  // end of getting answers

  return (
    <div>
      {examData ? (
        <div>
          <h1>Exam</h1>
          <button onClick={getAnswers}>log answers</button>
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
