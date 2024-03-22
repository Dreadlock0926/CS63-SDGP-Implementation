import "./ExamReview.css";
import QuestionComponent from "../../../components/QuestionComponent/QuestionComponent";
import Axios from "axios";
import { useEffect, useState, useLayoutEffect } from "react";
import { ClipLoader } from 'react-spinners';
import { useParams } from "react-router";
import "//unpkg.com/mathlive";

function ExamReview() {
  const { examID } = useParams();

  const [questionIDs, setQuestionIDs] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);

  const [examData, setExamData] = useState({});
  const [loading, setLoading] = useState(true);
  const [displayButton, setDisplayButton] = useState(true);

  const addAnswers = () => {
    setDisplayButton(false);

    const questionContainer = document.querySelector(".question-review-container");
    const pageContainer = document.querySelector(".qr-container");
    const answerFields = document.querySelectorAll("math-field");
    const subContainers = document.querySelectorAll(".answer-for-sub-question");

    questionContainer.classList.remove("hidden");
    pageContainer.style.alignItems = "normal";
    pageContainer.classList.remove("vh-det");

    subContainers.forEach((subContainer) => {
      subContainer.style.flexDirection = "column";
      subContainer.style.alignItems = "flex-start";
    });

    for (let i = 0; i < answerFields.length; i++) {
      const pCorrect = document.createElement("p");
      pCorrect.style.textAlign = "start";
      pCorrect.style.fontSize = "1.15rem";
      pCorrect.innerText = "Correct Answer:";
      pCorrect.style.fontWeight = "bold";

      const mathfieldCorrect = document.createElement("math-field");
      mathfieldCorrect.value = correctAnswers[i];
      mathfieldCorrect.style.border = "0px solid green";
      mathfieldCorrect.style.marginBlock = "25px";
      mathfieldCorrect.style.backgroundColor = "white";
      mathfieldCorrect.style.color = "green";
      mathfieldCorrect.style.width = "100%";
      mathfieldCorrect.readOnly = "true";

      const fieldContainerCorrect = document.createElement("div");
      fieldContainerCorrect.style.width = "40%";
      fieldContainerCorrect.style.backgroundColor = "white";
      fieldContainerCorrect.style.color = "green";
      fieldContainerCorrect.style.marginBlock = "20px";
      fieldContainerCorrect.appendChild(pCorrect);
      fieldContainerCorrect.appendChild(mathfieldCorrect);

      const pUser = document.createElement("p");
      pUser.style.textAlign = "start";
      pUser.style.fontSize = "1.15rem";
      pUser.innerText = "User Answer:";
      pUser.style.fontWeight = "bold";

      // const mathfieldUser = document.createElement("math-field");
      // mathfieldUser.value = answerFields[i].value;
      // mathfieldUser.style.border = "0px solid green";
      // mathfieldUser.style.marginBlock = "25px";
      // mathfieldUser.style.backgroundColor = "white";
      // mathfieldUser.style.color = "green";
      // mathfieldUser.style.width = "100%";
      // mathfieldUser.readOnly = "true";

      // const fieldContainerUser = document.createElement("div");
      // fieldContainerUser.style.width = "40%";
      // fieldContainerUser.style.backgroundColor = "white";
      // fieldContainerUser.style.color = "green";
      // fieldContainerUser.style.marginBlock = "20px";
      // fieldContainerUser.appendChild(pUser);
      // fieldContainerUser.appendChild(mathfieldUser);

      answerFields[i].parentNode.insertBefore(
        fieldContainerCorrect,
        answerFields[i].nextSibling
      );
      answerFields[i].parentNode.insertBefore(
        pUser,
        answerFields[i]
      );
      answerFields[i].value = userAnswers[i];
      answerFields[i].readOnly = "true";

      if (userAnswers[i] === correctAnswers[i]) {
        answerFields[i].style.color = "green";
        answerFields[i].style.border = "0px solid green";
      } else {
        if (answerFields[i].value === "") {
          answerFields[i].value = "∅"
        }
        answerFields[i].style.color = "red";
        answerFields[i].style.border = "0px solid red";
      }
    }
  };

  const getQuestions = async () => {
    if (questionIDs) {
      let questionsArray = [];
      let answerArray = [];
      for (let i = 0; i < questionIDs.length; i++) {
        try {
          const response = await Axios.post(
            "http://localhost:8000/getQuestion",
            {
              questionID: questionIDs[i],
            }
          );
          const questionData = response.data;
          for (let j = 0; j < questionData.answersGrid.length; j++) {
            if (questionData.answersGrid[j] !== "") {
              answerArray.push(questionData.answersGrid[j]);
            }
          }
          questionsArray.push(
            <QuestionComponent
              key={i + 1}
              question={questionData}
              mqNum={i + 1}
            />
          );
        } catch (err) {
          console.log(err);
        }
      }
      setLoading(false);
      setQuestions(questionsArray);
      setCorrectAnswers(answerArray);
    }
  };

  const getExam = async () => {
    try {
      const response = await Axios.post("http://localhost:8000/exam/getExam", {
        examRef: examID,
      });
      setExamData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getExam();
  }, []);

  useEffect(() => {
    if (examData) {
      setUserAnswers(examData.userAnswers);
      setQuestionIDs(examData.examQuestions);
    }
  }, [examData]);

  useEffect(() => {
    if (questionIDs && questionIDs.length > 0) {
      getQuestions();
    }
  }, [questionIDs]);

  useEffect(() => {
    console.log(userAnswers);
  }, [userAnswers]);

  return (
    <>
      {loading ? (
            <div className="loader-container">
                <ClipLoader size={450} color="#1fa3d5" loading={true} />
            </div>
            ) : (
        <div className="qr-container vh-det">
        <div className="question-review-container hidden">{questions}</div>
        <div className="info-panel question-review">
          <div className="top-qr">
            <div className="qrt">
              <div className="qrt-container">Module: </div>
              <div className="qrt-value">{examData.examModule}</div>
            </div>
            <div className="qrt">
              <div className="qrt-container">Exam Type: </div>
              <div className="qrt-value">{examData.examType} Exam</div>
            </div>
          </div>
          <div className="middle-qr">
            <div className="qr-mark-title">Mark</div>
            <div className="qr-mark">{Math.round(examData.mark/examData.totalMark * 100)}%</div>
          </div>
          <div className="bottom-qr">
            {displayButton && <button onClick={addAnswers}>View Answers</button>}
          </div>
        </div>
      </div>)}
    </>
  );
}

export default ExamReview;
