import "./ExamPage.css";
import QuestionComponent from "../../components/QuestionComponent/QuestionComponent";
import Axios from "axios";
import { useEffect, useState } from "react";
import { ClipLoader } from 'react-spinners';
import "//unpkg.com/mathlive";
import ExamCountDown from "../TestPages/ExamCount-Down";
import { useNavigate, Link, Navigate } from "react-router-dom";


function InfoPanel({ examType, examSubject, numQuestions, setSubmitRun, submitRun }) {

    const toggleSubmitRun = () => {
        setSubmitRun(true);
    }

  return (
    <div className="info-panel">
      <div className="timer-container">
        <div className="timer-text">Time Remaining</div>
        <div className="timer">
            <ExamCountDown examType={"s1"} onComplete={toggleSubmitRun} />
        </div>
      </div>
      <div className="exam-info">
        <div className="exam-info-header">Exam Information</div>
        <div className="subject-info">
          <div className="subject-tag">Subject:</div>
          <div className="subject-name">{examSubject}</div>
        </div>
        <div className="exam-meta-info">
          <div className="exam-type">Exam Type:</div>
          <div className="exam-name">{examType} Exam</div>
        </div>
      </div>
    </div>
  );
}

function ExamPageContent({setIsLoadingInfo, setExamType, setExamSubject, setNumQuestions, setCorrectIndexes, correctIndex, setMark, 
    setCorrectQuestions, setWrongQuestions, correctQuestions, wrongQuestions, submitButtonClicked, setUserWrittenAnswers, examRef, 
    userRef, setUserRef, submitRun, setTotalMark}) {

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
                style={{height: 200 + 'px',marginBlock: 20 + 'px', width: 800 + 'px'}}>{answer}
                    </math-field>
                }

        </div>
        )
    }

    const [questions, setQuestions] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [questionsList, setQuestionsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [enablePopup, setEnablePopup] = useState(false);

    let writtenAnswers = [];

    useEffect(() => {
        console.log(correctAnswers);
    }, [correctAnswers])

    useEffect(() => {

        const questionArray = [];
        const answerArray = [];

        const receiveQuestions = async () => {

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
                    setIsLoading(false);
                    setIsLoadingInfo(false);
                }
    
            }
    
            setNumQuestions(questionArray.length);
            setQuestions(questionArray);
            setCorrectAnswers(answerArray);
            setIsLoading(false);
            setIsLoadingInfo(false);

        }

        if (questionsList.length > 0) {
    
            receiveQuestions();

        }

    }, [questionsList])
    
    const getQuestion = async ( setQuestionsList, setExamType, setExamSubject ) => {

        try {
            const response = await Axios.post('http://localhost:8000/exam/getExam', {
                "examRef": examRef
            });

            setUserRef(response.data.userRef)
            setExamType(response.data.examType);
            setExamSubject(response.data.examModule);
            setQuestionsList(response.data.examQuestions)

        } catch (err) {
            console.log(err);
        }

    }

    useEffect(()=>{
        getQuestion(setQuestionsList, setExamType, setExamSubject);
    },[])

    useEffect(() => {

        let correctQuestionsContainer = [];

        if (wrongQuestions.length > 0) {
            for (let i = 0; i < questions.length; i++) {
                if (!wrongQuestions.includes(questions[i].props.question.questionID)) {
                    correctQuestionsContainer.push(questions[i].props.question.questionID)
                }
            }
        } else {
            for (let i = 0; i < questions.length; i++) {
                correctQuestionsContainer.push(questions[i].props.question.questionID)
            }
        }

        setCorrectQuestions(correctQuestionsContainer);

    }, [wrongQuestions])

    useEffect(() => {
        let markCount = -1;
        let mark = 0;
        let totalMark = 0;

        let wrongQuestionsOrigin = [];

        for (let i = 0; i < questions.length; i++) {
            let markGrid = questions[i].props.question.marksGrid;
            for (let j = 0; j < markGrid.length; j++) {
                if (markGrid[j] !== "") {
                    totalMark += parseInt(markGrid[j]);
                    markCount++;
                    if (correctIndex.includes(markCount)) {
                        mark += parseInt(markGrid[j]);
                    } else {
                        if (!wrongQuestionsOrigin.includes(questions[i].props.question.questionID)) {
                            wrongQuestionsOrigin.push(questions[i].props.question.questionID);
                        }
                    }
                }
            }
        }

        setWrongQuestions(wrongQuestionsOrigin);

        setTotalMark(totalMark);
        setMark(mark);
    }, [correctIndex])

    const submitAnswers = () => {

        const writtenAnswerContainer = document.querySelectorAll("math-field");
        writtenAnswers = (Array.from(writtenAnswerContainer).map((answer) => answer.value));

        setUserWrittenAnswers(writtenAnswers);

        let correctIndexesContainer = [];

        for (let i = 0; i < writtenAnswers.length; i++) {
            if (!correctIndexesContainer.includes(i) && writtenAnswers[i]===correctAnswers[i]) {
                correctIndexesContainer.push(i);
            }
        }
        

        if (correctIndexesContainer.length > 0) {
            setCorrectIndexes(correctIndexesContainer);
        } else {
            setCorrectIndexes([]);
        }
    
    }

    useEffect(() => {
        if (submitRun) {
            submitAnswers();
        }
    }, [submitRun])

    function PopUp({ submitButtonClicked, submitAnswers, TogglePopup, enablePopup }) {

        return (
            <>
                {enablePopup && 
                <div className="popup-container">
                    <div className="popups">
                        <div className="top-popup">Warning</div>
                        <div className="middle-popup">
                            <div className="p">You are about to submit your answers and calculate your mark. If there are any questions left unanswered, you will not get another chance.</div>
                        </div>
                        <div className="bottom-popup">
                            <button onClick={() => TogglePopup(false)} className="submit-ans">Close</button>
                            <button onClick={() => {
                                if (!submitButtonClicked) {
                                    submitAnswers()
                                }
                            }} className="submit-ans">
                            Confirm Answer Submission
                            </button>
                        </div>
                    </div>
                </div>}
            </>
        )
    }

    const TogglePopup = (bool) => {
        if (bool) {
            window.scrollTo(0, 0);
            document.querySelector(".exams-container").classList.add('exams-container-on-popup');
            setEnablePopup(true);
        } else {
            document.querySelector(".exams-container").classList.remove('exams-container-on-popup');
            setEnablePopup(false);
        }
    }

    return (
        <>
        <div className="exam-page">
            {isLoading ? (
            <div className="loader-container">
                <ClipLoader size={450} color="#1fa3d5" loading={true} />
            </div>
            ) : (
            <>
                <div className="questions-container">{questions}</div>
                {/* <button onClick={() => {
                    if (!submitButtonClicked) {
                        submitAnswers()
                    }
                }} className="submit">
                Submit Answers
                </button> */}
                <button className="submit-inverse" onClick={() => {TogglePopup(true)}}>Submit Answers</button>
            </>
            )}
        </div>
        <PopUp submitButtonClicked={submitButtonClicked} submitAnswers={submitAnswers} enablePopup={enablePopup} TogglePopup={TogglePopup} />
        </>
      );
}

function ExamPage() {

    const [examRef, setExamRef] = useState("65f8690fee075fad884a3e4f");
    const [userRef, setUserRef] = useState("");

    const [isLoadingInfo, setIsLoadingInfo] = useState(true);
    const [examType, setExamType] = useState("");
    const [examSubject, setExamSubject] = useState("");
    const [numQuestions, setNumQuestions] = useState(0);

    const [correctIndex, setCorrectIndexes] = useState([]);
    const [correctQuestions, setCorrectQuestions] = useState([]);
    const [wrongQuestions, setWrongQuestions] = useState([]);
    const [mark, setMark] = useState(0);
    const [totalMark, setTotalMark] = useState(0);

    const [userWrittenAnswers, setUserWrittenAnswers] = useState([]);

    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
    const [submitRun, setSubmitRun] = useState(false);

    useEffect(() => {

        if (wrongQuestions.length > 0 || correctQuestions.length > 0) {
            setSubmitButtonClicked(true);
        }

    }, [correctQuestions]);

    useEffect(() => {

        if (wrongQuestions.length > 0 || correctQuestions.length > 0) {
            setSubmitButtonClicked(true);
        }

    }, [wrongQuestions])
    
    const postUserDetails = async () => {

        try {
            const response = await Axios.post('http://localhost:8000/exam/updateExam', {
                "examRef": examRef,
                "userRef": userRef,
                "marks": mark,
                "totalMark": totalMark,
                "correctQuestions": correctQuestions,
                "wrongQuestions": wrongQuestions,
                "userAnswers": userWrittenAnswers
            });

        } catch (err) {
            console.log(err);
        }

    }

    const navigator = useNavigate();

    useEffect(() => {
        
        console.log("The users marks are:")
        console.log(mark);

        console.log("The total marks are:")
        console.log(totalMark);

        console.log("the correct indexes are: ")
        console.log(correctIndex);

        console.log("Correct questions: ")
        console.log(correctQuestions);

        console.log("Wrong questions: ")
        console.log(wrongQuestions);

        console.log("The users written answers are: ")
        console.log(userWrittenAnswers);
        
        if (submitButtonClicked) {
            postUserDetails().then(
                navigator("/receipt", {state:{examRef:examRef}})
            )
        }

    }, [submitButtonClicked])



    return (
        <div className="exams-container">
            {!isLoadingInfo && <InfoPanel examType={examType} examSubject={examSubject} numQuestions={numQuestions} setSubmitRun={setSubmitRun} />}
            <ExamPageContent 
            examRef={examRef}
            setIsLoadingInfo={setIsLoadingInfo} setExamType={setExamType} 
            setExamSubject={setExamSubject} setNumQuestions={setNumQuestions}
            setCorrectIndexes={setCorrectIndexes} correctIndex={correctIndex}
            setCorrectQuestions={setCorrectQuestions} setWrongQuestions={setWrongQuestions} 
            correctQuestions={correctQuestions} wrongQuestions={wrongQuestions}
            submitButtonClicked={submitButtonClicked} setUserWrittenAnswers={setUserWrittenAnswers}
            setUserRef={setUserRef} userRef={userRef}
            setMark={setMark} submitRun={submitRun}
            setTotalMark={setTotalMark}
            />
        </div>
    )
}

export default ExamPage;
