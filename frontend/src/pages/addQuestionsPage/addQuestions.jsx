import NavBar from "../../components/NavigationBar/navBar.jsx";
import "../main.css"
import "../addQuestionsPage/addQuestions.css"
import {useRef, useState} from 'react';
import { useEffect } from "react";

function QuestionSourcePanel( {setQuestionSource, setQuestionTopic, setQuestionNumber, setQuestionYear, setQuestionVariant} ) {

    const [toggleCambridgeQuestion, setToggleCambridgeQuestion] = useState(false);

    const qpSwitch = useRef();
    const toggledForm = useRef();

    const toggleQuestionFromCambridge = () => {

        setToggleCambridgeQuestion(!toggleCambridgeQuestion);
        
    };

    useEffect(() => {

        if (toggleCambridgeQuestion) {

            qpSwitch.current.style.justifyContent = "flex-end";
            toggledForm.current.style.visibility = "visible";

        } else {

            qpSwitch.current.style.justifyContent = "flex-start";
            toggledForm.current.style.visibility = "hidden";

        }

    }, [toggleCambridgeQuestion])

    return (

        <>
        <div className="panel-container">
            <div className="question-source-container">
                <form>
                    <label className="qs-input">
                        <p>Question Source</p>
                        <input className="qs-input" type="text" list="data" onChange={e => setQuestionSource(e.target.value)} />
                        <datalist id="data">
                            <option value="Statistics I" />
                            <option value="Pure Mathematics I" />
                        </datalist>
                    </label>
                </form>
                <form>
                    <label className="qs-input">
                        <p>Question Topic</p>
                        <input className="qs-input" type="text" list="topic-data" onChange={e => setQuestionTopic(e.target.value)} />
                        <datalist id="topic-data">
                            <option value="Integration" />
                            <option value="Differentiation" />
                        </datalist>
                    </label>
                </form>
                <div className="question-specifier">
                    <p className="qs-pa">Is this question from a
                    Cambridge International AS and A Level Past 
                    Paper? </p>
                    <div ref={qpSwitch} onClick={toggleQuestionFromCambridge} className="qp-switch">
                        <div className="qp-sphere"></div>
                    </div>
                </div>
                <form ref={toggledForm}>
                    <label>
                        <p>Question Number</p>
                        <input className="qn-input" type="text" name="ques-num" onChange={e => setQuestionNumber(e.target.value)}/>
                    </label>
                    <label>
                        <p>Year</p>
                        <input className="qy-input" type="text" list="ques-year" onChange={e => setQuestionYear(e.target.value)}/>
                        <datalist id="ques-year">
                            <option value="May 2000" />
                            <option value="Oct 2000" />
                        </datalist>
                    </label>
                    <label>
                        <p>Variant</p>
                        <input className="qv-input" type="text" list="ques-var" onChange={e => setQuestionVariant(e.target.value)}/>
                        <datalist id="ques-var">
                            <option value="1" />
                            <option value="2" />
                            <option value="3" />
                        </datalist>
                    </label>
                </form>
            </div>
        </div>
        </>
    );

}

function QuestionGridUnit( {index, onInputChange} ) {

    const [questionText, setQuestionText] = useState('');
    const [answerText, setAnswerText] = useState('');
    const [answerType, setAnswerType] = useState('');
    const [figureText, setFigureText] = useState('');

    useEffect(() => {
        onInputChange(index, {
          questionText,
          answerText,
          answerType,
          figureText,
        });
      }, [index, questionText, answerText, answerType, figureText, onInputChange]);

    return (

        <>
            <div className="qgu-unit">
                <p className="qgu-index">{index}.</p>
                <div className="input-grid">
                    <input placeholder="Question" value={questionText} onChange={e => setQuestionText(e.target.value)}
                    type="text" className="qgu-ques-input" />
                    <div className="qgu-answer">
                        <input placeholder="Answer" value={answerText} onChange={e => setAnswerText(e.target.value)}
                         type="text" className="qgu-answer-input" />
                        <input list="answer-type-qgu" placeholder="Answer Type" value={answerType} onChange={e => setAnswerType(e.target.value)}
                         type="text" className="qgu-answer-type" />
                        <datalist id="answer-type-qgu">
                            <option value="Histogram" />
                            <option value="Expression" />
                            <option value="Box and Whisker" />
                        </datalist>
                    </div>
                    <input placeholder="Figure" value={figureText} onChange={e => setFigureText(e.target.value)}
                     type="text" className="qgu-figure-input" />
                </div>
            </div>
        </>

    );

}

function QuestionAndCorrespondingAnswerPanel( {logQuestionSource, setQuestionObject} ) {
    const [gridUnitList, setGridUnitList] = useState([]);
    const [keyCounter, setKeyCounter] = useState(1);
    const [inputValues, setInputValues] = useState({});
  
    const addSubQuestion = () => {
      setGridUnitList((prevList) => [
        ...prevList,
        <QuestionGridUnit
          key={keyCounter}
          index={prevList.length + 1}
          onInputChange={handleInputChange}
        />,
      ]);
      setKeyCounter((prevCounter) => prevCounter + 1);
    };
  
    const handleInputChange = (index, values) => {
        setInputValues((prevValues) => ({
          ...prevValues,
          [index]: values,
        }));
      };

      useEffect(() => {

        setQuestionObject(inputValues);

    }, [inputValues])
  
    return (
      <>
        <p className="qa-main-text">Add Questions and Corresponding Answers</p>
        <div className="qa-framework">{gridUnitList}</div>
        <button onClick={addSubQuestion} className="add-sub-question-btn">
          + Add Sub Question
        </button>
        <button onClick={logQuestionSource} className="final-add-btn">
            Log Input Values
        </button>
      </>
    );
  }

function QuestionFinalPanel() {

    const [questionSource, setQuestionSource] = useState("");
    const [questionTopic, setQuestionTopic] = useState("");
    const [questionNumber, setQuestionNumber] = useState(0);
    const [questionYear, setQuestionYear] = useState("");
    const [questionVariant, setQuestionVariant] = useState(0);
    const [questionObject, setQuestionObject] = useState({});

    const logQuestionSource = () => {

        console.log(questionSource);
        console.log(questionTopic);
        console.log(questionNumber);
        console.log(questionYear);
        console.log(questionVariant);
        console.log(questionObject);

    }

    return (
    <div className="question-final-panel">
        <h2>Add Question</h2>
        <QuestionSourcePanel 
        setQuestionSource={setQuestionSource}  setQuestionTopic={setQuestionTopic}
        setQuestionNumber={setQuestionNumber} 
        setQuestionYear={setQuestionYear} setQuestionVariant={setQuestionVariant} />
        <QuestionAndCorrespondingAnswerPanel logQuestionSource={logQuestionSource} setQuestionObject={setQuestionObject} />
    </div>
    );

}

function AddQuestionsPage() {

    return(
        <>
        <NavBar />
        <QuestionFinalPanel />
        </>
    );   

}

export default AddQuestionsPage;