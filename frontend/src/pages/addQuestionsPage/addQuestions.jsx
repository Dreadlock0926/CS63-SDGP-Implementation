import NavBar from "../../components/NavigationBar/navBar.jsx";
import "../main.css"
import "../addQuestionsPage/addQuestions.css"
import {useRef, useState} from 'react';
import { useEffect } from "react";
import axios from 'axios';

function QuestionSourcePanel( {setQuestionSource, setQuestionTopic, setQuestionNumber, setQuestionYear, setQuestionVariant, currentQuestionSource, currentTopic} ) {

    const [topicInputBoxes, setTopicInputBoxes] = useState([]);
    const [moduleInputBoxes, setModuleInputBoxes] = useState([]);

    // Retrieving the topics

    useEffect(() => {

        const retrieveModules = async () => {
            try {
                const response = await axios.get('http://localhost:8000/addQuestion/getModules')
                const newOptions = response.data.map((topic, i) => (
                    <option key={i} value={topic}>{topic}</option>
                ));
                setModuleInputBoxes(newOptions);
            } catch (error) {
                console.error(error);
            }
        };
    
        retrieveModules();

        const retrieveTopics = async () => {
            setTopicInputBoxes([]);
    
            try {
                const response = await axios.post('http://localhost:8000/addQuestion/getQuestionInfo', {
                    "source": currentQuestionSource
                });
    
                setTopicInputBoxes(prevState => {
                    const newOptions = response.data.topics.map((topic, i) => (
                        <option key={i} value={topic}>{topic}</option>
                    ));
                    return [...prevState, ...newOptions];
                });

                setQuestionTopic(response.data.topics[0]);

            } catch (err) {
                console.log(err);
            }
        };

        retrieveTopics();
    
    }, [currentQuestionSource]);

    // End of retrieving topics

    return (

        <>
        <div className="panel-container">
            <div className="question-source-container">
                <form>
                    <label className="qs-input">
                        <p>Question Source</p>
                        <select className="qs-input" onChange={e => setQuestionSource(e.target.value)}>
                            <option value={"default"}>Default</option>
                            {moduleInputBoxes}
                        </select>
                    </label>
                </form>
                <form>
                    <label className="qs-input">
                        <p>Question Topic</p>
                        <select className="qs-input" onChange={e => setQuestionTopic(e.target.value)}>
                                {topicInputBoxes}
                        </select>
                    </label>
                </form>
                <FromCambridgePanel setQuestionNumber={setQuestionNumber} setQuestionVariant={setQuestionVariant} setQuestionYear={setQuestionYear} />
            </div>
        </div>
        </>
    );

}

function FromCambridgePanel( {setQuestionNumber, setQuestionYear, setQuestionVariant} ) {

    const [toggleCambridgeQuestion, setToggleCambridgeQuestion] = useState(false);

    const handleToggle = () => {
      setToggleCambridgeQuestion(!toggleCambridgeQuestion);

      if (!toggleCambridgeQuestion) {

        setQuestionNumber(0);
        setQuestionYear("000 0000");
        setQuestionVariant(0);

      }
    };


    return (

        <>
            <div className="question-specifier">
            <p className="qs-pa">Is this question from a
            Cambridge International AS and A Level Past
            Paper? </p>
            <div className="qp-switch" onClick={handleToggle}>
                <div className="qp-sphere"></div>
            </div>
            </div>
            {toggleCambridgeQuestion && <form>
                <label>
                    <p>Question Number</p>
                    <input className="qn-input" type="text" name="ques-num" onChange={e => setQuestionNumber(e.target.value)}/>
                </label>
                <label>
                    <p>Year</p>
                    <input className="qy-input" type="text" list="ques-year" onChange={e => setQuestionYear(e.target.value)}/>
                    <datalist id="ques-year">
                        <option value="Jun 2000" />
                        <option value="Nov 2000" />
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
            </form>}
        </>

    );

}

function QuestionGridUnit( {index, onInputChange} ) {

    const [questionText, setQuestionText] = useState('');
    const [answerText, setAnswerText] = useState('');
    const [answerType, setAnswerType] = useState('Expression');
    const [marksText, setMarksText] = useState('');
    const [figureText, setFigureText] = useState('');

    useEffect(() => {
        onInputChange(index, {
          questionText,
          answerText,
          answerType,
          marksText,
          figureText,
        });
      }, [index, questionText, answerText, answerType, marksText, figureText, onInputChange]);

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
                     <input placeholder="Marks" value={marksText} onChange={e => setMarksText(e.target.value)}
                    type="text" className="qgu-answer-input" />
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

    const [questionSource, setQuestionSource] = useState("Default");
    const [questionTopic, setQuestionTopic] = useState("");
    const [questionNumber, setQuestionNumber] = useState(0);
    const [questionYear, setQuestionYear] = useState("000 0000");
    const [questionVariant, setQuestionVariant] = useState(0);
    const [questionObject, setQuestionObject] = useState({});

    const logQuestionSource = async () => {

        let questionIDSource = "";
        let questionIDTopic = "";
        let questionIDYear = questionYear.replace(/ /g,'');

        if (questionIDYear.slice(0,3).toLowerCase() === "jun") {

            questionIDYear = "s" + "_" + questionIDYear.slice(3,7);

        } else if (questionIDYear.slice(0,3).toLowerCase() === "000") {

            questionIDYear = "0" + "_" + questionIDYear.slice(3,7);

        } else {

            questionIDYear = "w" + "_" + questionIDYear.slice(3,7);

        }

        let questionIDNumYearVariant = "_" + questionNumber + "_" + questionIDYear + "_" + questionVariant;

        let questionIDFinal = "";

        await axios.post('http://localhost:8000/addQuestion/getQuestionInfo', {
            "source":questionSource 
          })
          .then(res => {

                questionIDSource = res.data.sourceKey;
                
                for (let i = 0; i < res.data.topics.length; i++) {

                    if (questionTopic === res.data.topics[i]) {

                        questionIDTopic = res.data.topicKeys[i];

                    }
                    
                }

                questionIDFinal = questionIDSource + "_" + questionIDTopic + questionIDNumYearVariant;
                axios.post('http://localhost:8000/addQuestion', {
                    "questionID":questionIDFinal,
                    "questionTopic":questionTopic,
                    "questionsGrid":Object.values(questionObject).map(question => question.questionText),
                    "questionsFiguresGrid":Object.values(questionObject).map(question => question.figureText),
                    "answersTypeGrid":Object.values(questionObject).map(question => question.answerType),
                    "marksGrid":Object.values(questionObject).map(question => question.marksText),
                    "answersGrid":Object.values(questionObject).map(question => question.answerText),
                    "questionSource":questionSource
                })

          })
          .catch(err => console.log(err))
    }

    return (
    <div className="question-final-panel">
        <h2>Add Question</h2>
        <QuestionSourcePanel 
        setQuestionSource={setQuestionSource}  setQuestionTopic={setQuestionTopic}
        setQuestionNumber={setQuestionNumber} 
        setQuestionYear={setQuestionYear} setQuestionVariant={setQuestionVariant}
        currentQuestionSource={questionSource} currentTopic={questionTopic} />
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