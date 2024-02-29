/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import QuestionComponent from "../../components/QuestionComponent/QuestionComponent";
import Axios from 'axios';
import "./ExamFinal.css";

// import { UserContext } from "../../App";

const ExamFinalized = () => {
  const examData = sessionStorage.getItem("examData");
 let answerValues = [];
  if (examData) {
    answerValues.push(JSON.parse(examData))
  } else {
    window.location.href = "/scope";
  }

  //might have to use some local storage approach for this

  // getting answers

 
  let correctAnswers = [];
  let wrongAnswersIndex = [];
  let wrongQuestions = [];

  let marksArray = [];
  let totalMarks = 0;

  

  const getAnswers = () => {
    const answers = document.querySelectorAll("math-field");
    answerValues = Array.from(answers).map((answer) => answer.value);
    console.log(
      "This is what the user inputted for the answers:",
      answerValues
    );

    correctAnswers = [];
    JSON.parse(examData).forEach((question) => {
      question.answersGrid.forEach((answer) => {
        if (answer !== "") {
          correctAnswers.push(answer);
        }
      });
    });
    console.log("These are the correct answers:", correctAnswers);
    compareAnswers();
    addWrongAnswers();
    QuestionIDs();
  };

  async function QuestionIDs(){ //velo wrote this
    console.log(answerValues)

    try{
      for(let i = 0 ; i < answerValues.length ; i++){
          await Axios.post("http://localhost:8000/history",{questionID:answerValues[i]})
          alert("Posted!")
      }
    
    }catch(err){
      console.error(err);
    }
  }




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

    JSON.parse(examData).forEach((question) => {
      question.answersGrid.forEach((answer) => {
        if (answer !== "") {
          count += 1;
        }
        if (
          wrongAnswersIndex.includes(count) &&
          !wrongQuestions.includes(question.questionID)
        ) {
          wrongQuestions.push(question.questionID);
        }
      });
    });

    console.log("these are the IDs of the wrong questions", wrongQuestions);

    getTotalMarks();
  };

  function getTotalMarks() {
    marksArray = [];

    JSON.parse(examData).forEach((element) => {
      for (let index = 0; index < element.marksGrid.length; index++) {
        if (element.marksGrid[index] !== "") {
          marksArray.push(parseInt(element.marksGrid[index]));
        }
      }
    });
    totalMarks = marksArray.reduce((a, b) => a + b, 0);
    for (let i = 0; i < wrongAnswersIndex.length; i++) {
      totalMarks -= marksArray[wrongAnswersIndex[i]];
    }
    console.log("Total marks:", totalMarks);
  }


  

  // end of getting answers

  return (
    <div>
      {examData ? (
        <div>
          <h1 className="heading">Exam</h1>
          
          <div>
            {JSON.parse(examData).map((question, index) => {
              return (
                <div className="details" key={question._id || index}>
                  <QuestionComponent
                    key={question.questionID}
                    question={question}
                    mqNum={index + 1}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={getAnswers}>log answers</button>
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
