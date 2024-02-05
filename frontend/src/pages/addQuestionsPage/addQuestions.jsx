import NavBar from "../../components/NavigationBar/navBar.jsx";
import "../main.css"
import "../addQuestionsPage/addQuestions.css"
import {useRef, useState} from 'react';

function QuestionSourcePanel() {

    return (

        <>
        <div className="panel-container">
            <div className="question-source-container">
                <form>
                    <label className="qs-input">
                        <p>Question Source</p>
                        <input className="qs-input" type="text" list="data" />
                        <datalist id="data">
                            <option value="Statistics I" />
                            <option value="Pure Mathematics I" />
                        </datalist>
                    </label>
                </form>
                <div className="question-specifier">
                    <p className="qs-pa">Is this question from a
                    Cambridge International AS and A Level Past 
                    Paper? </p>
                    <div className="qp-switch">
                        <div className="qp-sphere"></div>
                    </div>
                </div>
                <form>
                    <label>
                        <p>Question Number</p>
                        <input className="qn-input" type="text" name="ques-num" />
                    </label>
                    <label>
                        <p>Year</p>
                        <input className="qy-input" type="text" list="ques-year" />
                        <datalist id="ques-year">
                            <option value="May 2000" />
                            <option value="Oct 2000" />
                        </datalist>
                    </label>
                    <label>
                        <p>Variant</p>
                        <input className="qv-input" type="text" list="ques-var" />
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

function QuestionGridUnit( {index} ) {

    const [questionText, setQuestionText] = useState('');
    const [answerText, setAnswerText] = useState('');
    const [answerType, setAnswerType] = useState('');
    const [figureText, setFigureText] = useState('');

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
                        <input placeholder="Answer Type" value={answerType} onChange={e => setAnswerType(e.target.value)}
                         type="text" className="qgu-answer-type" />
                    </div>
                    <input placeholder="Figure" value={figureText} onChange={e => setFigureText(e.target.value)}
                     type="text" className="qgu-figure-input" />
                </div>
            </div>
        </>

    );

}

function QuestionAndCorrespondingAnswerPanel() {

    const [gridUnitList, setGridUnitList] = useState([<QuestionGridUnit key={0} index={1} />]);
    const [keyCounter, setKeyCounter] = useState(1);
    
    const addSubQuestion = () => {
      setGridUnitList((prevList) => [
        ...prevList,
        <QuestionGridUnit key={keyCounter} index={prevList.length + 1} />,
      ]);
      setKeyCounter((prevCounter) => prevCounter + 1);
    };

    return (

        <>
            <p className="qa-main-text">Add Questions and Corresponding Answers</p>
            <div className="qa-framework">
                {gridUnitList}
            </div>
            <button onClick={addSubQuestion} className="add-sub-question-btn">+ Add Sub Question</button>
        </>

    );

}

function QuestionFinalPanel() {

    return (
    <div className="question-final-panel">
        <h2>Add Question</h2>
        <QuestionSourcePanel />
        <QuestionAndCorrespondingAnswerPanel />
        <button className="final-add-btn">Add</button>
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