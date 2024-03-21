/* eslint-disable no-unused-vars */
import { useEffect, useReducer, useState } from "react";
import Axios from "axios";
import "./Scope.css";

const Scope = () => {
  const [selectAllTopics, setSelectAllTopics] = useState(false);
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
    selectedTopic: [],
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
    setSelectAllTopics(false);

    const { checked } = event.target;
    const newSelectedTopics = checked
      ? [...state.selectedTopic, event.target.value]
      : state.selectedTopic.filter((topic) => topic !== event.target.value);

    dispatch({ type: "SELECT_TOPIC", payload: newSelectedTopics });
  };

  const handleModuleChange = (event) => {
    setSelectAllTopics(false);
    dispatch({ type: "SELECT_TOPIC", payload: [] });
    dispatch({ type: "SELECT_MODULE", payload: event.target.value });
    getTopics(event.target.value);
  };

  const retrieveQuestions = async () => {
    if (state.selectedTopic.length === 0) {
      alert("Please select at least one topic");
      return;
    } else {
      try {
        console.log("state.selectedTopic", state.selectedTopic);
        const response = await Axios.post(
          "http://localhost:8000/getQuestionsOnTopic/getQuestionsForExam",
          {
            topics: state.selectedTopic,
          }
        );

        console.log(response.data);
        setQuestions(response.data);

        const examJSON = JSON.stringify(response.data);
        sessionStorage.setItem("examData", examJSON);

        window.location.href = "/exam";
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

          <button
            onClick={() => {
              if (!selectAllTopics) {
                dispatch({ type: "SELECT_TOPIC", payload: state.topics });
                setSelectAllTopics(true);
              } else {
                dispatch({ type: "SELECT_TOPIC", payload: [] });
                setSelectAllTopics(false);
              }
            }}
          >
            {selectAllTopics ? "De-select All" : "Select All"}
          </button>

          <ul className="topicsCheckbox">
            {state.topics.map((topic, i) => (
              <li key={i}>
                <input
                  type="checkbox"
                  name="topic"
                  value={topic}
                  checked={
                    false || state.selectedTopic.includes(topic) ? true : false
                  }
                  onChange={handleTopicChange}
                />
                {topic}
              </li>
            ))}
          </ul>
          <p>Selected Topic: {state.selectedTopic.join(", ")}</p>
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
