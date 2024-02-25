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

  let marksArray = [];
  let totalMarks = 0;

  const getAnswers = () => {
    const answers = document.querySelectorAll("math-field");
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

    getTotalMarks();

};


let finalMark = 0;
function getTotalMarks() {
  marksArray = [];

  JSON.parse(examData).forEach(element => {
    for (let index = 0; index < element.marksGrid.length; index++) {
      if (element.marksGrid[index] !== "") {
        marksArray.push(parseInt(element.marksGrid[index]))
      }
    }
    
  });
  totalMarks = marksArray.reduce((a,b) => a+b, 0);
  for (let i = 0; i < wrongAnswersIndex.length; i++) {
      totalMarks -= marksArray[wrongAnswersIndex[i]];    
  }
  finalMark+=totalMarks;

  console.log("Total marks:", totalMarks);
}
finalMark=200
localStorage.setItem("marks",finalMark)

  // end of getting answers

  const finalMarks  = (e)=>{
    e.preventDefault();
    setTimeout(()=>{
              <Link to="finalized"/>
    },1000)
  }

  return (
    <div>
      {examData ? (
        <div>
          <h1>Exam</h1>
          <button onClick={getAnswers}>log answers</button>
          <div>
            <form onSubmit={finalMarks}>            
            {JSON.parse(examData).map((question, index) => {
              return (
                <div key={question.questionID || index }>
                  <QuestionComponent
                    key={question.questionID}
                    question={question}
                    mqNum={index + 1}
                  />
                </div>
              );
            })}
            <button type="submit" >Done!</button></form>

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
