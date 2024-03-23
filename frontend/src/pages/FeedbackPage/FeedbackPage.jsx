/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";
import "./FeedbackPage.css";
import initializeProbabilities from "./initializeProbabilities";
import { useNavigate } from "react-router-dom";

const FeedbackPage = () => {
  const navigator = useNavigate();

  const [availFeedbackModules, setAvailFeedbackModules] = useState([]);

  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedUser")).data);
  }, []);

  useEffect(() => {
    if (Object.keys(loggedInUser).length > 0) {
      console.log(loggedInUser);
      Object.keys(loggedInUser.topicProbabilities).map((moduleKey) => {
        let notStartedCount = 0;

        Object.values(loggedInUser.topicProbabilities[moduleKey]).map(
          (value) => {
            if (value === -1) {
              notStartedCount += 1;
            }
          }
        );

        if (
          Object.values(loggedInUser.topicProbabilities[moduleKey]).length !=
          notStartedCount
        ) {
          setAvailFeedbackModules((prev) => [...prev, moduleKey]);
        }
      });
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (availFeedbackModules.length > 0) {
      console.log(availFeedbackModules);
    }
  }, [availFeedbackModules]);

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
  const [topicProbabilitiesCloned, setTopicProbabilitiesCloned] =
    useState(null);

  //Module Probabilities
  const [moduleProbabilities, setModuleProbabilities] = useState({});
  const [moduleProbabilitiesSet, setModuleProbabilitiesSet] = useState(false);

  //Calculate Probabilities
  const calculateProbabilities = async (moduleID) => {
    setProbabilitiesSet(false);

    await Axios.post("http://localhost:8000/getTopics/getModuleProbs", {
      username: loggedInUser.username,
    })
      .then(function (response) {
        setCorrectAnswers(response.data.correctQuestions);
        setWrongAnswers(response.data.wrongQuestions);
        console.log("tma: ");
        console.log(response.data.topicProbabilities[moduleID]);
        setTopicProbabilitiesCloned(response.data.topicProbabilities[moduleID]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Update the module probabilities
  useEffect(() => {
    async function updateModuleProbability() {
      await Axios.post("http://localhost:8000/user/setModuleProbabilities", {
        username: loggedInUser.username,
        topicProbabilities: moduleProbabilities,
        moduleID: moduleID,
      })
        .then(function (response) {
          setModuleProbabilitiesSet(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    if (probabilitiesSet) {
      updateModuleProbability();
    }
  }, [moduleProbabilities]);

  //Get questions based on probabilities
  const getQuestionsOnProbability = async (moduleID) => {
    setModuleProbabilitiesSet(false);
    setExamQuestions([]);
    setModuleID(moduleID);

    await Axios.post("http://localhost:8000/getQuestion/getAllQuestions", {
      moduleID: moduleID,
    })
      .then(function (response) {
        setQuestionsList(response.data);
        calculateProbabilities(moduleID);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(loggedInUser.courses);
  };

  const getAvailableQuestions = (questionsList) => {
    setAvailableQuestions([]);

    //Checks if the ID is already in the Exam Questions list or if the user has already done the question before
    for (const question in questionsList) {
      let id = questionsList[question].questionID;
      if (!correctAnswers.includes(id) && !examQuestions.includes(id)) {
        for (const topic in topicProbabilities) {
          if (id.split("_")[1] === topic) {
            setAvailableQuestions((prev) => [...prev, id]);
          }
        }
      }
    }
  };

  const matchProbabilities = (availableQuestions) => {
    let numOfQuestions = 0;
    let iterable = 0;

    for (const i in availableQuestions) {
      for (const topic in topicProbabilities) {
        if (
          availableQuestions[i].split("_")[1] === topic &&
          topicProbabilities[topic] > 0
        ) {
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
            if (
              availableQuestions[i].split("_")[1] === topic &&
              !tempExamQuestions.includes(availableQuestions[i])
            ) {
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
  };

  useEffect(() => {
    if (availableQuestions.length > 0) {
      matchProbabilities(availableQuestions);
    }
  }, [availableQuestions]);

  useEffect(() => {
    console.log("exams out of this");
    console.log(examQuestions);

    if (examQuestions.length > 0) {
    }
  }, [examQuestions]);

  useEffect(() => {
    if (probabilitiesSet) {
      getAvailableQuestions(questionsList);
    }
  }, [probabilitiesSet]);

  useEffect(() => {
    console.log(questionsList);
  }, [questionsList]);

  const calculator = (probList) => {
    console.log("prob: ");
    console.log(probList);
    console.log(correctAnswers);
    console.log(wrongAnswers);

    let topicProbabilitiesClone = { ...probList };

    Object.keys(probList).forEach((key) => {
      if (probList[key] !== -1) {
        let numCorrect = 0;
        let numWrong = 0;
        correctAnswers.forEach((ans) => {
          if (ans.split("_")[1] === key && ans.split("_")[0] === moduleID) {
            numCorrect += 1;
          }
        });
        wrongAnswers.forEach((ans) => {
          if (ans.split("_")[1] === key && ans.split("_")[0] === moduleID) {
            numWrong += 1;
          }
        });

        if (numCorrect === 0 && numWrong === 0) {
        } else {
          let probability =
            Math.round((numWrong / (numWrong + numCorrect)) * 10) / 10;
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
  };

  useEffect(() => {
    if (topicProbabilitiesCloned) {
      calculator(topicProbabilitiesCloned);
    }
  }, [topicProbabilitiesCloned]);

  useEffect(() => {
    console.log("The topic probabilities are: ");
    console.log(topicProbabilities);
  }, [topicProbabilities]);

  useEffect(() => {
    if (moduleProbabilitiesSet) {
      createExam();
    }
  }, [moduleProbabilitiesSet]);

  const createExam = async () => {
    await Axios.post("http://localhost:8000/exam/saveExam", {
      examType: "Feedback",
      examQuestions: examQuestions,
      userRef: loggedInUser._id,
      examModule: "Pure Mathematics I",
      examTopic: "None",
    })
      .then(function (response) {
        navigator(`/exam/${response.data[0].Alert}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {availFeedbackModules.length > 0 ? (
        <div className="modules-container">
          {availFeedbackModules.map((moduleKey, index) => (
            <div
              key={index}
              className="module"
              onClick={() => getQuestionsOnProbability(moduleKey)}
            >
              <h3>
                {moduleKey === "p1"
                  ? "Pure Mathematics I"
                  : "Probability and Statistics I"}
              </h3>
            </div>
          ))}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default FeedbackPage;
