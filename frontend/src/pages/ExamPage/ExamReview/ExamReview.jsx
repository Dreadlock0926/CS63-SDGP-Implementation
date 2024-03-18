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
        
        for (let i = 0; i < answerFields.length; i++) {

            const mathfield = document.createElement("math-field");
            mathfield.value = correctAnswers[i];
            mathfield.style.border = "2px solid green";
            mathfield.readOnly = "true";

            answerFields[i].parentNode.insertBefore(mathfield, answerFields[i].nextSibling);
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
                "examRef":"65f6dd471ff32881c7c75cb1"
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
