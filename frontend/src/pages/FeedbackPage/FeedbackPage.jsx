/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import "./FeedbackPage.css";
import { UserContext } from "../../App";

const FeedbackPage = () => {
  const BASE = "http://localhost:8000/feedbacks";
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState([]);
  //Get correct answers from the UserData
  const [correctAnswers, setCorrectAnswers] = useState([]);
  // Get wrong answers from the UserData
  const [wrongAnswers, setWrongAnswers] = useState([]);
  // The questions for the feedback exam
  const [examQuestions, setExamQuestions] = useState([]);

  async function fetchData() {
    try {
      const response = await Axios.post(BASE, {
        userId: "65e5959fe25265c481c71f1c",
      }); //user.id
      if (response.status === 200) {
        setUserData(response.data);
        setCorrectAnswers([...correctAnswers, response.data.correctAnswers]);
        setWrongAnswers([...wrongAnswers, response.data.wrongAnswers]);
        setExamQuestions([...examQuestions, response.data.examQuestions]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData();
    console.log(`User Data ${JSON.stringify(userData)}`);
    console.log(`Correct answers ${JSON.stringify(correctAnswers)}`);
    console.log(`Wrong answers ${JSON.stringify(wrongAnswers)}`);
    console.log(`Exam Questions ${JSON.stringify(examQuestions)}`);
  }, []);

  //Variable tells if the probabilities are set
  const [probabilitiesSet, setProbabilitiesSet] = useState(false);

  //Available questions list
  const [availableQuestions, setAvailableQuestions] = useState([]);
  //Final Questions List
  const [questionsList, setQuestionsList] = useState([]);

  //Topic probabilities
  const [topicProbabilities, setTopicProbabilities] = useState({
    q: 0,
    f: 0,
    cg: 0,
    cm: 0,
    i: 0,
    d: 0,
  });

  useEffect(() => {
    console.log(topicProbabilities);
  });

  //Calculate Probabilities
  const calculateProbabilities = () => {
    let topicProbabilitiesClone = { ...topicProbabilities };

    Object.keys(topicProbabilities).forEach((key) => {
      let numCorrect = 0;
      let numWrong = 0;
      correctAnswers.forEach((ans) => {
        if (ans.split("_")[1] === key) {
          numCorrect += 1;
        }
      });
      wrongAnswers.forEach((ans) => {
        if (ans.split("_")[1] === key) {
          numWrong += 1;
        }
      });
      let probability =
        Math.round((numWrong / (numWrong + numCorrect)) * 10) / 10;
      if (probability === 0) {
        probability = 0.1;
      } else if (probability === 1) {
        probability = 0.9;
      }
      topicProbabilitiesClone[key] = probability;
    });

    setTopicProbabilities(topicProbabilitiesClone);
    setProbabilitiesSet(true);
  };

  //Get questions based on probabilities
  const getQuestionsOnProbability = async () => {
    await Axios.post("http://localhost:8000/getQuestion/getAllQuestions", {
      moduleID: "p1",
    })
      .then(function (response) {
        setQuestionsList(response.data);
        calculateProbabilities();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getAvailableQuestions = (questionsList) => {
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
    let tempExamQuestions = [];
    while (tempExamQuestions.length < 10) {
      for (const i in availableQuestions) {
        let chance = Math.random();
        for (const topic in topicProbabilities) {
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
    setExamQuestions(tempExamQuestions);
  };

  useEffect(() => {
    if (availableQuestions.length < 11) {
      setExamQuestions(availableQuestions);
    } else {
      matchProbabilities(availableQuestions);
    }
  }, [availableQuestions]);

  useEffect(() => {
    if (probabilitiesSet) {
      getAvailableQuestions(questionsList);
    }
  }, [probabilitiesSet]);

  useEffect(() => {
    console.log(examQuestions);
  }, [examQuestions]);

  return (
    <>
      <div className="modules-container">
        <div className="module" onClick={getQuestionsOnProbability}>
          Pure Mathematics I
        </div>
        <div className="module">Probability & Statistics I</div>
      </div>
    </>
  );
};

export default FeedbackPage;
