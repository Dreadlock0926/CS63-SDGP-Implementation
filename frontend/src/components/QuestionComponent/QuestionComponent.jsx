/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "./QuestionComponent.css";
import { useEffect, useRef, useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import Histogram from "../graphs/histogram"
import "//unpkg.com/mathlive";

function SubQuestion({ sqNum, sqText, sqMarks, sqHistogram }) {
  const [answer, setAnswer] = useState("");
  const answerRef = useRef();

  return (
    <div className="sub-question">
      <div className="sub-question-text-container">
        <div className="sq-num">{sqNum}</div>
        <div className="sub-question-text">
          <MathJax>{sqText}</MathJax>
        </div>
      </div>
      <div className="figure-for-sub-question">
  {sqHistogram ? sqHistogram && (
    <Histogram
    className="answer-input"
      width={300}
      height={500}
      numXMarkers={5}
      numYMarkers={7}
      scaleX={5}
      scaleY={10}
      maxBoxes={5}
    />
  ) :  ""}
  <math-field className="answer-input" placeholder="Answer..."  />
  <p>{answer? `The answer is ${answer}`:""}</p>
</div>

      <div className="answer-for-sub-question">
       
        <div className="mark-for-sq">({sqMarks} marks)</div>
      </div>
    </div>
  );
}

function QuestionComponent({ question, mqNum }) {
  const [isOneAnswerQuestion, setIsOneAnswerQuestion] = useState(false);
  const [hasContext, setHasContext] = useState(false);
  const [subQuestions, setSubQuestions] = useState([]);

  const subQuestionAlphabet = "abcdefghijklmnopqrstuvwxyz";

  useEffect(() => {
    setIsOneAnswerQuestion(question.questionsGrid.length === 1);
    setHasContext(question.answersGrid[0] === "");
  }, [question]);   
  let isAHistogram = false;

  useEffect(() => {
    const generateSubQuestions = () => {
      const startIdx = hasContext ? 1 : 0;
      const newArray = question.questionsGrid.slice(startIdx).map((sqText, index) => (
     
        <SubQuestion
          key={index}
          sqNum={subQuestionAlphabet[index]}
          sqText={sqText}
          sqHistogram={question.answersTypeGrid[index + startIdx] === "Histogram" }
          isAHistogram={question.answersTypeGrid[index + startIdx] === "Histogram" ? true : false}
          sqMarks={question.marksGrid[index + startIdx]}
        />
      ));
      setSubQuestions(newArray);
    };

    generateSubQuestions();
  }, [question, hasContext]);

  function log() {
    console.log("One answer question: " + isOneAnswerQuestion);
    console.log("Has context: " + hasContext);
    console.log(subQuestions);
  }

  return (
    <MathJaxContext>
      <div className="question-component-container">
        <div className="main-question-container">
          <div className="main-text-container">
            <div className="mq-num" onClick={log}>
              {mqNum}
            </div>
            {(hasContext || isOneAnswerQuestion) && (
              <div className="main-text">
                {question.questionsGrid[0] && (
                  <MathJax>{question.questionsGrid[0]}</MathJax>
                )}
              </div>
            )}
          </div>
          {isOneAnswerQuestion && (
            <div className="mq-answer-container">
              <math-field className="answer-input" placeholder="Answer..." />
              <div className="mark-for-mq">
                ({question.marksGrid[0]} marks)
              </div>
            </div>
          )}
        </div>
        {!isOneAnswerQuestion && (
          <div className="sub-question-container">{subQuestions}</div>
        )}
      </div>
    </MathJaxContext>
  );
}

export default QuestionComponent;
