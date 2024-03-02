import { useRef, useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import "./FeedbackPage.css";

const FeedbackPage = () => {

    //Get correct answers from the UserData
    const [correctAnswers, setCorrectAnswers] = useState(["p1_q_3_w_2022_2", "p1_f_11_s_2015_2", "p1_f_1_w_2015_2", "p1_cg_1_w_2022_2", 'p1_i_9_w_2015_2', 'p1_i_10_w_2015_2', 'p1_d_5_s_2015_1','p1_d_2_s_2015_1']);
    // Get wrong answers from the UserData
    const [wrongAnswers, setWrongAnswers] = useState(["p1_f_8_w_2015_2", "p1_cg_7_s_2015_2", "p1_cg_6_w_2015_2", 'p1_cm_6_w_2016_2', 'p1_cm_2_s_2015_2', 'p1_cm_6_s_2015_2', 'p1_cm_5_w_2015_2', 'p1_i_1_s_2015_2', 'p1_i_10_s_2015_2', 'p1_d_4_s_2015_2', 'p1_d_3_w_2015_2']);
    // The questions for the feedback exam
    const [examQuestions, setExamQuestions] = useState([]);
    //Variable tells if the probabilities are set
    const [probabilitiesSet, setProbabilitiesSet] = useState(false);

    //Available questions list
    const [availableQuestions, setAvailableQuestions] = useState([]);
    //Final Questions List
    const [questionsList, setQuestionsList] = useState([]);

    //Topic probabilities
    const [topicProbabilities, setTopicProbabilities] = useState({
        "q":0,
        "f":0,
        "cg":0,
        "cm":0,
        "i":0,
        "d":0
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
        setProbabilitiesSet(true);
    
    }

    //Get questions based on probabilities
    const getQuestionsOnProbability = async () => {
        await Axios.post("http://localhost:8000/getQuestion/getAllQuestions", {
            moduleID: "p1"
        })
        .then(function (response) {
            setQuestionsList(response.data);
            calculateProbabilities();
        })
        .catch(function (error) {
            console.log(error);
          })
    }

    const getAvailableQuestions = (questionsList) => {
        for (const question in questionsList) {
            let id = questionsList[question].questionID
            if (!correctAnswers.includes(id) && !examQuestions.includes(id)) {
                for (const topic in topicProbabilities) {
                    if (id.split("_")[1] === topic) {
                        setAvailableQuestions(prev => [...prev, id]);
                    }
                }
            }
        }
    }

    const matchProbabilities = (availableQuestions) => {
        let tempExamQuestions = [];
        while (tempExamQuestions.length < 10) {

            for (const i in availableQuestions) {

                let chance = Math.random();
                for (const topic in topicProbabilities) {
                    if (availableQuestions[i].split("_")[1] === topic && !tempExamQuestions.includes(availableQuestions[i])) {
                        if (topicProbabilities[topic] >= chance) {
                            tempExamQuestions.push(availableQuestions[i]);
                        }
                    }
                }
    
            }

        }
        setExamQuestions(tempExamQuestions);
    }

    useEffect(() => {
        console.log(topicProbabilities);
    }, [topicProbabilities]);

    useEffect(() => {
        console.log(examQuestions);
    }, [examQuestions])

    useEffect(() => {
        if (availableQuestions.length < 11) {
            setExamQuestions(availableQuestions);
        } else {
            matchProbabilities(availableQuestions);
        }
    }, [availableQuestions])

    useEffect(() => {
        console.log("probabilities are set")
        if (probabilitiesSet) {
            getAvailableQuestions(questionsList);
        }
    }, [probabilitiesSet])

    return (
        <>
            <div className="modules-container">
                <div className="module" onClick={getQuestionsOnProbability}>Pure Mathematics I</div>
                <div className="module">Probability & Statistics I</div>
            </div>
        </>
    );

}


export default FeedbackPage;
