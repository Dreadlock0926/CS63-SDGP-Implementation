/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import QuestionComponent from "../../components/QuestionComponent/QuestionComponent";
import Axios from "axios";

// import { UserContext } from "../../App";

const ExamFinalized = () => {
  const examData = sessionStorage.getItem("examData");

  if (examData) {
    console.log("");
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

const filtered = wrongQuestions.map((question) => question.split("_"));
const index = [];

filtered.forEach(question => {
    index.push(question[1]);
});

const outcome = [];

index.forEach((topicKeys) => {
    switch (topicKeys) {
        case "rod":
            outcome.push(0);
            break;
        case "pac":
            outcome.push(1);
            break;
        case "p":
            outcome.push(2);
            break;
        case "drv":
            outcome.push(3);
            break;
        case "tnd":
            outcome.push(4);
            break;
        default:
            break;
    }
});

const maxOccurrences = outcome.reduce((maxCount, currentValue) => {
    const count = outcome.filter((val) => val === currentValue).length;
    return count > maxCount ? count : maxCount;
}, 0);

console.log(`The maxOccuring index is ${maxOccurrences}`);

async function fetchTopic(e) {
    e.preventDefault();
    try {
        const { data } = await Axios.post("http://localhost:8000/index", { theIndex: maxOccurrences });
        if (data.status == 200) {
            alert(`The weakest topic is ${data}`);
        } else {
            console.log(data);
        }
    } catch (err) {
        console.error(err);
    }
}






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
              return (
                <div key={question._id || index}>
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
      <button onClick={fetchTopic}>Find Indexing!</button>
    </div>
  );
};

export default ExamFinalized;
