import { useRef, useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import "./FeedbackPage.css";

const FeedbackPage = () => {

    //Get correct answers from the UserData
    const [correctAnswers, setCorrectAnswers] = useState(["p1_q_3_w_2022_2", "p1_f_11_s_2015_2", "p1_f_1_w_2015_2", "p1_cg_1_w_2022_2"]);
    // Get wrong answers from the UserData
    const [wrongAnswers, setWrongAnswers] = useState(["p1_f_8_w_2015_2", "p1_cg_7_s_2015_2", "p1_cg_6_w_2015_2", 'p1_cm_6_w_2016_2', 'p1_cm_2_s_2015_2', 'p1_cm_6_s_2015_2', 'p1_cm_5_w_2015_2']);

    //Topic probabilities
    const [topicProbabilities, setTopicProbabilities] = useState({
        "q":0,
        "f":0,
        "cg":0,
        "cm":0
    });

    //Calculate Probabilities
    const calculateProbabilities = () => {

        let topicProbabilitiesClone = {...topicProbabilities};

        Object.keys(topicProbabilities).forEach(key => {
            let numCorrect = 0;
            let numWrong = 0;
            correctAnswers.forEach(ans => {
                if (ans.split("_")[1] === key) {
                    numCorrect += 1;
                }
            })
            wrongAnswers.forEach(ans => {
                if (ans.split("_")[1] === key) {
                    numWrong += 1;
                }
            })
            let probability = Math.round(numWrong/(numWrong+numCorrect) * 10)/10;
            if (probability === 0) {
                probability = 0.1;
            } else if (probability === 1) {
                probability = 0.9;
            }
            topicProbabilitiesClone[key] = probability;
        });
        
        setTopicProbabilities(topicProbabilitiesClone);
    
    }

    return (
        <>
            <div className="modules-container">
                <div className="module" onClick={calculateProbabilities}>Pure Mathematics I</div>
                <div className="module">Probability & Statistics I</div>
            </div>
        </>
    );

}


export default FeedbackPage;
