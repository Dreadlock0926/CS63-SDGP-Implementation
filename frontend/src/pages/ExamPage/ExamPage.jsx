import "./ExamPage.css"
import QuestionComponent from "../../components/QuestionComponent/QuestionComponent"
import Axios from 'axios';
import { useEffect, useState } from "react";
import "//unpkg.com/mathlive";

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

    function QuestionOnPage({question, mqNum}) {

        const [workingVisible, setWorkingVisible] = useState(false);
        const [answer, setAnswer] = useState("");

        const spawnWorkingArea = () => {
            setWorkingVisible(!workingVisible);
        }

        return (
        <div className="question-on-page">
            <QuestionComponent question={question} mqNum={mqNum}/>
            <div onClick={spawnWorkingArea} className="working-panel"></div>
            {
                    workingVisible &&
                    <math-field 
                    placeholder="Workings..."
                    onInput={evt => setAnswer(evt.target.value)} 
                    style={{width: 275 + 'px', height: 200 + 'px',marginBlock: 20 + 'px'}}>{answer}
                    </math-field>
                }
        </div>
        )
    }

    const [questions, setQuestions] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [writtenAnswers, setWrittenAnswers] = useState([]);

    useEffect(() => {
        console.log(correctAnswers);
    }, [correctAnswers])

    const getQuestion = async () => {

        const questionArray = [];
        const answerArray = [];
        const questionsList = ["p1_s_2_w_2022_2","p1_cg_1_w_2022_2","s1_p_3_w_2022_2", "p1_s_2_w_2022_2","p1_cg_1_w_2022_2","s1_p_3_w_2022_2"];

        for (let i = 0; i < questionsList.length; i++) {

            try {
                const response = await Axios.post('http://localhost:8000/getQuestion', {
                    "questionID": questionsList[i]
                });
        
                const questionData = response.data;

                questionData.answersGrid.forEach(answer => {
                    if (answer !== "") {
                        answerArray.push(answer);
                    }
                }) 

                questionArray.push(
                    <QuestionOnPage key={i} question={questionData} mqNum={i+1}/>
                );
        
            } catch (err) {
                console.log(err);
            }

        }

        setQuestions(questionArray);
        setCorrectAnswers(answerArray);

    }

    useEffect(()=>{
        getQuestion();
    },[])

    const submitAnswers = () => {
        const writtenAnswerContainer = document.querySelectorAll("math-field");
        setWrittenAnswers(Array.from(writtenAnswerContainer).map((answer) => answer.value));
        console.log(writtenAnswers);
    }

    return (
        <>
            <div className="exam-page">
                <div className="questions-container">{questions}</div>
                <button onClick={submitAnswers} className="submit">Submit Answers</button>
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