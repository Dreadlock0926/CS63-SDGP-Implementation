/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import QuestionComponent from "../../components/QuestionComponent/QuestionComponent"
import Axios from 'axios';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function ExamQuestionTest() {

  
    const [questions, setQuestions] = useState([]);

    const noContextTestQuestion = {
        questionID: "s1_pac_7_w_2022_2",
        questionTopic: "Permutations and combinations",
        questionsGrid: [
            "Find the number of different arrangements of the 9 letters in the word ALLIGATOR in which the two As are together and the two Ls are together.",
            "The 9 letters in the word ALLIGATOR are arranged in a random order. Find the probability that the two Ls are together and there are exactly 6 letters between the two As. ",
            "Find the number of different selections of 5 letters from the 9 letters in the word ALLIGATOR which contain at least one A and at most one L."
        ],
        questionsFiguresGrid: [
            "",
            "",
            ""
        ],
        answersTypeGrid: [
            "Expression",
            "Expression",
            "Expression"
        ],
        answersGrid: [
            "5040",
            "0.0132",
            "35"
        ],
        questionSource: "Probability and Statistics I"
    }

    
    const getQuestion = async () => {

        const questionArray = [];
        const questionsList = ["p1_s_2_w_2022_2","p1_cg_1_w_2022_2","s1_p_3_w_2022_2"];

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

    let userAnswers = [];


    const getAnswers = () => {
        const answers = document.querySelectorAll(".answer-input");
        const answerValues = Array.from(answers).map((answer) => answer.value);
        console.log("Answers:", answerValues);
        userAnswers.push(answerValues);
    };  

console.log(JSON.stringify(userAnswers));
console.log(JSON.stringify(questions));

  

  
   
    const duration = questions.filter((x)=>x.duration)

    return (
        <>
         {/* <button onClick={getQuestion}>Click to display questions</button> */}
        {/* <QuestionComponent question={noContextTestQuestion} mqNum={1}/> */}
        {questions} 

        <button onClick={getAnswers}>Log the answers</button>
                <CountdownCircleTimer
            isPlaying
            duration={duration ? duration : ""}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[Math.random()]}
        >
            {({ remainingTime }) => remainingTime > 0 ? remainingTime - 1 : 0}
        </CountdownCircleTimer>

        </>
    )

}

export default ExamQuestionTest;