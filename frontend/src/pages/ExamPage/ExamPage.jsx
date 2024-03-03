import "./ExamPage.css"
import QuestionComponent from "../../components/QuestionComponent/QuestionComponent"
import Axios from 'axios';
import { useEffect, useState } from "react";

function InfoPanel() {

    return (
        <div className="info-panel">
            <div className="timer-container">
                <div className="timer-text">Time Remaining</div>
                <div className="timer"></div>
            </div>
            <div className="questions-remaining">9 out of 11 Questions Answered</div>
            <div className="exam-info">
                <div className="exam-info-header">Exam Information</div>
                <div className="subject-info">
                    <div className="subject-tag">Subject:</div>
                    <div className="subject-name">Pure Mathematics I</div>
                </div>
                <div className="exam-meta-info">
                    <div className="exam-type">Exam Type:</div>
                    <div className="exam-name">Feedback Exam</div>
                </div>
            </div>
        </div>
    );
}

function ExamPageContent() {

    const [questions, setQuestions] = useState([]);
    
    const getQuestion = async () => {

        const questionArray = [];
        const questionsList = ["p1_s_2_w_2022_2","p1_cg_1_w_2022_2","s1_p_3_w_2022_2", "p1_s_2_w_2022_2","p1_cg_1_w_2022_2","s1_p_3_w_2022_2"];

        for (let i = 0; i < questionsList.length; i++) {

            try {
                const response = await Axios.post('http://localhost:8000/getQuestion', {
                    "questionID": questionsList[i]
                });
        
                const questionData = response.data;
                questionArray.push(<QuestionComponent key={questionsList[i]} question={questionData} mqNum={i+1}/>);
        
            } catch (err) {
                console.log(err);
            }

        }

        setQuestions(questionArray);

    }

    useEffect(()=>{
        getQuestion();
    },[])

    return (
        <>
            <div className="exam-page">
                {questions}
            </div>
        </>
    )
}

function ExamPage() {

    return (
        <div className="container">
            <ExamPageContent />
            <InfoPanel />
        </div>
    )
}

export default ExamPage;