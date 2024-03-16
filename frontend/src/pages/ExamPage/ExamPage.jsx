import "./ExamPage.css";
import QuestionComponent from "../../components/QuestionComponent/QuestionComponent";
import Axios from "axios";
import { useEffect, useState } from "react";
import { ClipLoader } from 'react-spinners';
import "//unpkg.com/mathlive";
import ExamCountDown from "../TestPages/ExamCount-Down";

function InfoPanel({ examType, examSubject, numQuestions }) {

  return (
    <div className="info-panel">
      <div className="timer-container">
        <div className="timer-text">Time Remaining</div>
        <div className="timer">
            <ExamCountDown examType={"s1"} />
        </div>
      </div>
      <div className="questions-remaining">0 out of {numQuestions} Questions Answered</div>
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
    setCorrectQuestions, setWrongQuestions, correctQuestions, wrongQuestions}) {

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
                style={{height: 200 + 'px',marginBlock: 20 + 'px', width: 60 + '%'}}>{answer}
                    </math-field>
                }

        </div>
        )
    }

    const [questions, setQuestions] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [questionsList, setQuestionsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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

        // const questionsList = ["p1_s_2_w_2022_2","p1_cg_1_w_2022_2","s1_p_3_w_2022_2", "p1_s_2_w_2022_2","p1_cg_1_w_2022_2","s1_p_3_w_2022_2"];

        try {
            const response = await Axios.post('http://localhost:8000/exam/getExam', {
                "examRef": "65f34e27421397a390df401b"
            });

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
        }

        setCorrectQuestions(correctQuestionsContainer);

    }, [wrongQuestions])

    useEffect(() => {
        let markCount = -1;
        let mark = 0;

        let wrongQuestionsOrigin = [];

        for (let i = 0; i < questions.length; i++) {
            let markGrid = questions[i].props.question.marksGrid;
            for (let j = 0; j < markGrid.length; j++) {
                if (markGrid[j] !== "") {
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

        setMark(mark);
    }, [correctIndex])

    const submitAnswers = () => {
        const writtenAnswerContainer = document.querySelectorAll("math-field");
        writtenAnswers = (Array.from(writtenAnswerContainer).map((answer) => answer.value));

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
    
        console.log(writtenAnswers);
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
                <button onClick={submitAnswers} className="submit">
                Submit Answers
                </button>
            </>
            )}
        </div>
        </>
      );
}

function ExamPage() {
    const [isLoadingInfo, setIsLoadingInfo] = useState(true);
    const [examType, setExamType] = useState("");
    const [examSubject, setExamSubject] = useState("");
    const [numQuestions, setNumQuestions] = useState(0);

    const [correctIndex, setCorrectIndexes] = useState([]);
    const [correctQuestions, setCorrectQuestions] = useState([]);
    const [wrongQuestions, setWrongQuestions] = useState([]);
    const [mark, setMark] = useState(0);

    useEffect(() => {
        console.log("The users marks are:")
        console.log(mark);
    }, [mark])

    useEffect(() => {
        console.log("the correct indexes are: ")
        console.log(correctIndex);
    }, [correctIndex])

    useEffect(() => {
        console.log("Correct questions: ")
        console.log(correctQuestions);
    }, [correctQuestions]);

    useEffect(() => {
        console.log("Wrong questions: ")
        console.log(wrongQuestions);
    }, [wrongQuestions])

    return (
        <div className="exams-container">
            <ExamPageContent 
            setIsLoadingInfo={setIsLoadingInfo} setExamType={setExamType} 
            setExamSubject={setExamSubject} setNumQuestions={setNumQuestions}
            setCorrectIndexes={setCorrectIndexes} correctIndex={correctIndex}
            setCorrectQuestions={setCorrectQuestions} setWrongQuestions={setWrongQuestions} 
            correctQuestions={correctQuestions} wrongQuestions={wrongQuestions}
            setMark={setMark} 
            />
            {!isLoadingInfo && <InfoPanel examType={examType} examSubject={examSubject} numQuestions={numQuestions} />}
        </div>
    )
}

export default ExamPage;
