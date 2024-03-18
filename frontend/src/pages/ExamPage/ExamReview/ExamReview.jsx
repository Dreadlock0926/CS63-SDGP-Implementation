import "./ExamReview.css";
import QuestionComponent from "../../../components/QuestionComponent/QuestionComponent";
import Axios from "axios";
import { useEffect, useState, useLayoutEffect } from "react";
import "//unpkg.com/mathlive";

function ExamReview() {

    const [questionIDs, setQuestionIDs] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);

    const [examData, setExamData] = useState({});
    const [loading, setLoading] = useState(true);

    const addAnswers = () => {
        const answerFields = document.querySelectorAll("math-field");
        const subContainers = document.querySelectorAll(".answer-for-sub-question")

        subContainers.forEach(subContainer => {
            subContainer.style.flexDirection = "column";
            subContainer.style.alignItems = "flex-start";
        })

        for (let i = 0; i < answerFields.length; i++) {

            const p = document.createElement("p");
            p.style.textAlign = "start";
            p.style.fontSize = "1.15rem";
            p.innerText = "Correct Answer:";
            p.style.fontWeight = "bold";

            const mathfield = document.createElement("math-field");
            mathfield.value = correctAnswers[i];
            mathfield.style.border = "2px solid green";
            mathfield.style.marginBlock = "25px";
            mathfield.style.width = "100%";
            mathfield.readOnly = "true";

            const fieldContainer = document.createElement("div");
            fieldContainer.style.width = "40%";
            fieldContainer.appendChild(p);
            fieldContainer.appendChild(mathfield);

            answerFields[i].parentNode.insertBefore(fieldContainer, answerFields[i].nextSibling);
            answerFields[i].value = userAnswers[i];
            answerFields[i].readOnly = "true";
            
            if (userAnswers[i] === correctAnswers[i]) {
                answerFields[i].style.border = "2px solid green";
            } else {
                answerFields[i].style.border = "2px solid red";
            }
        }
    }

    const getQuestions = async () => {

        if (questionIDs) {

            let questionsArray = [];
            let answerArray = [];
            for (let i = 0; i < questionIDs.length; i++) {
            
                try {
                    const response = await Axios.post('http://localhost:8000/getQuestion', {
                        "questionID": questionIDs[i]
                    });
                    const questionData = response.data;
                    for (let j = 0; j < questionData.answersGrid.length; j++) {
                        if (questionData.answersGrid[j] !== "") {
                            answerArray.push(questionData.answersGrid[j]);
                        } 
                    }
                    questionsArray.push(<QuestionComponent key={i+1} question={questionData} mqNum={i+1}/>);
                } catch (err) {
                    console.log(err);
                }
        
            }
            setQuestions(questionsArray);
            setCorrectAnswers(answerArray);
        }

    }

    const getExam = async () => {

        try {
            const response = await Axios.post('http://localhost:8000/exam/getExam', {
                "examRef":"65f6dd481ff32881c7c75cb4"
            });
            setExamData(response.data);
        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        getExam();
    }, [])

    useEffect(() => {
        if (!loading && questions.length === questionIDs.length) {
        }
    }, [loading])

    useEffect(() => {
        console.log(questions);
        if (questions.length > 0) {
            setLoading(false);
        }
    }, [questions])

    useEffect(() => {
        if (examData) {
            setUserAnswers(examData.userAnswers);
            setQuestionIDs(examData.examQuestions);
        }
    }, [examData])

    useEffect(() => {
        if (questionIDs && questionIDs.length > 0) {
            getQuestions(); 
        }
    }, [questionIDs])

    useEffect(() => {
        console.log(userAnswers);
    }, [userAnswers])

    return (<>
            <div className="question-review-container">
                {questions}
            </div>
            <button onClick={addAnswers}>Add Answers</button>
        </>
        )
}

export default ExamReview;
