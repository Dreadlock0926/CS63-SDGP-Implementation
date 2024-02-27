/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import QuestionComponent from "../../components/QuestionComponent/QuestionComponent";
import Axios from "axios";
import {UserContext} from "../../App"
// import { UserContext } from "../../App";



const ExamFinalized = () => {
  const examData = sessionStorage.getItem("examData");
  const {user="guest",setUser} = useContext(UserContext); //guest by default cuz the state hasn't been made so far!

  if (examData) {
    //
  } else {
    window.location.href = "/scope";
  }

  //might have to use some local storage approach for this

  // getting answers

  let answerValues = [];
  let correctAnswers = [];
  let wrongAnswersIndex = [];
  let questionIDs = [];
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
    sendAnswers();
    compareAnswers();
    addWrongAnswers();
};


async function sendAnswers(e){
  e.preventDefault();
    // try{
    //    await Axios.post("http://localhost:8000/history",{questionID:questionIDs},{by:user.username || "guest"});
    //   alert("Exam History Added!")
    // }catch(err){  
    //   console.error(err);
    // }
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

    const counts = {};
    const outcome = wrongQuestions.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    outcome.split("_")
    const filtered = [];
    console.log(`The count is ${JSON.stringify(counts)}`)
    getTotalMarks();

};

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
  console.log("Total marks:", totalMarks);
}

  // end of getting answers



  return (
    <div>
      {examData ? (
        <div>
          <h1>Exam</h1>
          <button onClick={getAnswers}>log answers</button>
          <div>
            {JSON.parse(examData).map((question, index) => {
                      questionIDs.push(question.questionID);
              return (
                <div key={question._id}>
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
