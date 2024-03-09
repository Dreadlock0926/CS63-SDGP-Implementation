/* eslint-disable no-unused-vars */
import { useEffect, useReducer, useState } from "react";
import Axios from "axios";

const Scope = () => {
  const [questions, setQuestions] = useState({});

  const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_MODULES":
        return { ...state, modules: action.payload };
      case "FETCH_TOPICS":
        return { ...state, topics: action.payload };
      case "SELECT_MODULE":
        return { ...state, selectedModule: action.payload };
      case "SELECT_TOPIC":
        return { ...state, selectedTopic: action.payload };
      default:
        return state;
    }
  };

  const initialState = {
    modules: [],
    topics: [],
    selectedModule: "Pure Mathematics I",
    selectedTopic: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getTopics = async (selectedModule) => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/addQuestion/getQuestionInfo",
        {
          source: selectedModule,
        }
      );

      dispatch({ type: "FETCH_TOPICS", payload: response.data.topics });
      dispatch({ type: "SELECT_TOPIC", payload: response.data.topics[0] });
    } catch (error) {}
  };

  const getModules = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8000/addQuestion/getModules"
      );

      getTopics();
      dispatch({ type: "FETCH_MODULES", payload: response.data });
      dispatch({ type: "SELECT_MODULE", payload: response.data[0] });
      getTopics(response.data[0]);
    } catch (error) {}
  };

  useEffect(() => {
    getModules();
  }, []);

  const handleTopicChange = (event) => {
    dispatch({ type: "SELECT_TOPIC", payload: event.target.value });

    setQuestions({});
  };

  const handleModuleChange = (event) => {
    dispatch({ type: "SELECT_TOPIC", payload: state.topics[0] });
    dispatch({ type: "SELECT_MODULE", payload: event.target.value });

    setQuestions({});
    getTopics(event.target.value);
  };

  const retrieveQuestions = async () => {
    if (state.selectedTopic.length === 0) {
      alert("Please select at least one topic");
      return;
    } else {
      try {
        const response = await Axios.post(
          "http://localhost:8000/getQuestionsOnTopic/getQuestionsForExam",
          {
            topic: state.selectedTopic,
          }
        );

        console.log(response.data);
        setQuestions(response.data);

        const examJSON = JSON.stringify(response.data);
        sessionStorage.setItem("examData", examJSON);

        window.location.href = "/examfinal";
      } catch (error) {}
    }
  };

  return (
    <div>
      {state.modules.length > 0 ? ( // Check if modules are available
        <>
          <select
            id="moduleDropdown"
            onChange={handleModuleChange}
            value={state.selectedModule}
          >
            {state.modules.map((module, i) => (
              <option key={i} value={module}>
                {module}
              </option>
            ))}
          </select>

          <select
            name="topicsDropdown"
            onChange={handleTopicChange}
            value={state.selectedTopic}
          >
            {state.topics.map((topic, i) => (
              <option key={i} value={topic}>
                {topic}
              </option>
            ))}
          </select>

          <p>Selected Topic: {state.selectedTopic}</p>
          <p>Selected Module: {state.selectedModule}</p>
          <button onClick={retrieveQuestions}>Get Questions</button>

          {questions && questions.length > 0 ? (
            <ul>
              {questions.map((question, i) => (
                <li key={i}>
                  ID: {question.questionID} - Topic: {question.questionTopic} ::
                  Question : {question.questionsGrid}
                  Answers : {question.answersGrid}
                </li>
              ))}
            </ul>
          ) : (
            <p>No questions available</p>
          )}
        </>
      ) : (
        <p>Loading modules...</p>
      )}
    </div>
  );
};

export default Scope;
