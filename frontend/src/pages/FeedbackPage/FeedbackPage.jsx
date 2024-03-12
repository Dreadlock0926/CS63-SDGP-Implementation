/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";
import "./FeedbackPage.css";
import initializeProbabilities from "./initializeProbabilities";

const FeedbackPage = () => {

    const {
        loggedInUser,
        setLoggedInUser
    } = useContext(UserContext);

    useEffect(() => {
        console.log(JSON.parse(sessionStorage.getItem("loggedUser")).data);
        setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedUser")).data);
      }, []);

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
        "cg":-1,
        "cm":-1,
        "i":0,
        "d":0
    });

    //Module Probabilities
    const [moduleProbabilities, setModuleProbabilities] = useState({});

    //Calculate Probabilities
    const calculateProbabilities = async (moduleID) => {
        setProbabilitiesSet(false);

        const calculator = (probList) => {

            let topicProbabilitiesClone = {...probList};

            Object.keys(probList).forEach(key => {
                if (probList[key] !== -1) {
    
                    let numCorrect = 0;
                    let numWrong = 0;
                    correctAnswers.forEach(ans => {
                        if (ans.split("_")[1] === key && ans.split("_")[0] === moduleID) {
                            numCorrect += 1;
                        }
                    })
                    wrongAnswers.forEach(ans => {
                        if (ans.split("_")[1] === key && ans.split("_")[0] === moduleID) {
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
                }   
            });
    
            setTopicProbabilities(topicProbabilitiesClone);
            setProbabilitiesSet(true);

        }

        await Axios.post("http://localhost:8000/getTopics/getModuleProbs", {
            username:loggedInUser.username
        })
        .then(function (response) {
            calculator(response.data[moduleID]);
        })
        .catch(function (error) {
            console.log(error);
        })
    
    }

    // Update the module probabilities
    useEffect(() => {

        async function updateModuleProbability() {
            await Axios.post("http://localhost:8000/user/updateModuleProbabilities", {
                username: loggedInUser.username,
                topicProbabilities: moduleProbabilities
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
              })
        }

        updateModuleProbability();
        

    }, [moduleProbabilities])

    //Get questions based on probabilities
    const getQuestionsOnProbability = async (moduleID) => {

        console.log(loggedInUser);

            await initializeProbabilities(loggedInUser)
            .then((result) => {
                console.log(result);
                setModuleProbabilities(result);
            })
            .catch((error) => {
                console.log(error);
            })

        await Axios.post("http://localhost:8000/getQuestion/getAllQuestions", {
            moduleID: moduleID
        })
        .then(function (response) {
            setQuestionsList(response.data);
            calculateProbabilities(moduleID);
        })
        .catch(function (error) {
            console.log(error);
          })

    console.log(loggedInUser.courses);
    }

    const getAvailableQuestions = (questionsList) => {
        setAvailableQuestions([]);

        //Checks if the ID is already in the Exam Questions list or if the user has already done the question before
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

        let numOfQuestions = 0;
        let iterable = 0;

        for (const i in availableQuestions) {
            for (const topic in topicProbabilities) {
                if (availableQuestions[i].split("_")[1] === topic && topicProbabilities[topic] > 0) {
                    console.log(availableQuestions);
                    console.log(numOfQuestions);
                    numOfQuestions += 1;
                }
            }
        }

        if (numOfQuestions < 10) {
            iterable = numOfQuestions;
        } else {
            iterable = 10;
        }

        let tempExamQuestions = [];

        while (tempExamQuestions.length < iterable) {

            console.log("number of questions: " + numOfQuestions);

            for (const i in availableQuestions) {
                let chance = Math.random();
                for (const topic in topicProbabilities) {
                    
                    if (topicProbabilities[topic] > 0) {

                        if (availableQuestions[i].split("_")[1] === topic && !tempExamQuestions.includes(availableQuestions[i])) {

                            if (topicProbabilities[topic] >= chance) {
                                if (tempExamQuestions.length === 10) {
                                    break;
                                }
                                tempExamQuestions.push(availableQuestions[i]);
                            }
                        }

                    }
                }
    
            }

        }
        setExamQuestions(tempExamQuestions);

    }

    useEffect(() => {
        matchProbabilities(availableQuestions);
    }, [availableQuestions])

    useEffect(() => {
        console.log(examQuestions)
    }, [examQuestions])

    useEffect(() => {
        if (probabilitiesSet) {
            getAvailableQuestions(questionsList);
        }
    }, [probabilitiesSet])

    useEffect(() => {
        console.log(questionsList);
    }, [questionsList])

    useEffect(() => {
        console.log(topicProbabilities);
    }, [topicProbabilities])

    return (
        <>
            <div className="modules-container">
                <div className="module" onClick={() => getQuestionsOnProbability("p1")}>Pure Mathematics I</div>
                <div className="module" onClick={() => getQuestionsOnProbability("s1")}>Probability & Statistics I</div>
            </div>
        </>
    );

}


export default FeedbackPage;
