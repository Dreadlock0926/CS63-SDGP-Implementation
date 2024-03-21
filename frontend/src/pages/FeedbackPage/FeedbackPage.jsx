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
    const [correctAnswers, setCorrectAnswers] = useState([]);
    // Get wrong answers from the UserData
    const [wrongAnswers, setWrongAnswers] = useState([]);
    // The questions for the feedback exam
    const [examQuestions, setExamQuestions] = useState([]);
    //Variable tells if the probabilities are set
    const [probabilitiesSet, setProbabilitiesSet] = useState(false);

    //Current module
    const [moduleID, setModuleID] = useState("");

    //Available questions list
    const [availableQuestions, setAvailableQuestions] = useState([]);
    //Final Questions List
    const [questionsList, setQuestionsList] = useState([]);

    //Topic probabilities
    const [topicProbabilities, setTopicProbabilities] = useState(null);

    //Topic probabilities clone
    const [topicProbabilitiesCloned, setTopicProbabilitiesCloned] = useState(null);

    //Module Probabilities
    const [moduleProbabilities, setModuleProbabilities] = useState({});

    //Calculate Probabilities
    const calculateProbabilities = async (moduleID) => {
        setProbabilitiesSet(false);

        await Axios.post("http://localhost:8000/getTopics/getModuleProbs", {
            username:loggedInUser.username
        })
        .then(function (response) {
            setCorrectAnswers(response.data.correctQuestions);
            setWrongAnswers(response.data.wrongQuestions);
            console.log("tma: ")
            console.log(response.data.topicProbabilities[moduleID]);
            setTopicProbabilitiesCloned(response.data.topicProbabilities[moduleID]);
        })
        .catch(function (error) {
            console.log(error);
        })
    
    }

    // Update the module probabilities
    useEffect(() => {

        async function updateModuleProbability() {
            await Axios.post("http://localhost:8000/user/setModuleProbabilities", {
                username: loggedInUser.username,
                topicProbabilities: moduleProbabilities,
                moduleID: moduleID
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
              })
        }

        if (probabilitiesSet) {
            updateModuleProbability();
        }

    }, [moduleProbabilities])

    //Get questions based on probabilities
    const getQuestionsOnProbability = async (moduleID) => {
        setModuleID(moduleID);

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

    const calculator = (probList) => {

        console.log("prob: ");
        console.log(probList);
        console.log(correctAnswers);
        console.log(wrongAnswers);

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

                if (numCorrect !== 0 && numWrong !== 0) {

                    let probability = Math.round(numWrong/(numWrong+numCorrect) * 10)/10;
                    if (probability === 0) {
                        probability = 0.1;
                    } else if (probability === 1) {
                        probability = 0.9;
                    }

                 topicProbabilitiesClone[key] = probability;

                }

            }   
        });

        setTopicProbabilities(topicProbabilitiesClone);
        setProbabilitiesSet(true);
        setModuleProbabilities(topicProbabilitiesClone);

    }

    useEffect(() => {
        if (topicProbabilitiesCloned) {
            calculator(topicProbabilitiesCloned);
        }
    }, [topicProbabilitiesCloned]);

    useEffect(() => {
        console.log("The topic probabilities are: ")
        console.log(topicProbabilities)
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
