/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import "./FeedbackPage.css";
import { UserContext } from "../../App";

const FeedbackPage = () => {
  const BASE = "http://localhost:8000/feedbacks";
  const { setStatus } = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [examQuestions, setExamQuestions] = useState([]);
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [questionsList, setQuestionsList] = useState([]);
  const [topicProbabilities, setTopicProbabilities] = useState({
    q: 0,
    f: 0,
    cg: 0,
    cm: 0,
    i: 0,
    d: 0,
  });

  const [probabilitiesSet, setProbabilitiesSet] = useState(false);

  const fetchData = async () => {
    try {
      const response = await Axios.post(BASE, {
        userId: "65e5959fe25265c481c71f1c",
      });
      if (response.status === 200) {
        const responseData = response.data;
        setUserData(responseData);
        setCorrectAnswers([...correctAnswers, responseData.correctAnswers]);
        setWrongAnswers([...wrongAnswers, responseData.wrongAnswers]);
        setExamQuestions([...examQuestions, responseData.examQuestions]);
        setAvailableQuestions([
          ...availableQuestions,
          responseData.availableQuestions,
        ]);
        setQuestionsList([...questionsList, responseData.questionsList]);
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 400) {
        setStatus("User ID wasn't received!");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function sendUpdates(e) {
    e.preventDefault();
    try {
      const outcome = await Axios.post(`${BASE}/add`, {
        newTopics: Object.keys(topicProbabilities),
        newProbability: Object.values(topicProbabilities),
      });
      if(outcome.status===200){
        alert("Update sent!")
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    console.log("User Data:", userData);
    console.log("Correct Answers:", correctAnswers);
    console.log("Wrong Answers:", wrongAnswers);
    console.log("Exam Questions:", examQuestions);
  }, [userData, correctAnswers, wrongAnswers, examQuestions]);

  const calculateProbabilities = () => {
    let topicProbabilitiesClone = { ...topicProbabilities };
    Object.keys(topicProbabilitiesClone).forEach((key) => {
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

  const getQuestionsOnProbability = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/getQuestion/getAllQuestions",
        {
          moduleID: "p1",
        }
      );
      if (response.status === 200) {
        const responseData = response.data;
        setQuestionsList(responseData);
        calculateProbabilities();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAvailableQuestions = (questions) => {
    let available = [];
    for (const question of questions) {
      let id = question.questionID;
      if (!correctAnswers.includes(id) && !examQuestions.includes(id)) {
        for (const topic in topicProbabilities) {
          if (id.split("_")[1] === topic) {
            available.push(id);
          }
        }
      }
    }
    setAvailableQuestions(available);
  };

  const matchProbabilities = (available) => {
    let tempExamQuestions = [];
    while (tempExamQuestions.length < 10) {
      for (const question of available) {
        let chance = Math.random();
        for (const topic in topicProbabilities) {
          if (
            question.split("_")[1] === topic &&
            !tempExamQuestions.includes(question)
          ) {
            if (topicProbabilities[topic] >= chance) {
              if (tempExamQuestions.length === 10) {
                break;
              }
              tempExamQuestions.push(question);
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
    console.log("Exam Questions:", examQuestions);
  }, [examQuestions]);

  return (
    <div className="modules-container">
      <div className="module" onClick={getQuestionsOnProbability}>
        Pure Mathematics I
      </div>
      <div className="module">Probability & Statistics I</div>
      <button onClick={sendUpdates}>Update Stats!</button>
      <p>{status}</p>
    </div>
  );
};

export default FeedbackPage;
