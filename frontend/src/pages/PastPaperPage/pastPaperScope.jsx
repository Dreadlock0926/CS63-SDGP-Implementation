import React from "react";
import { useState, useReducer, useEffect } from "react";
import Axios from "axios";

const PastPaperScope = () => {
  const initialState = {
    modules: {},
    selectedSeason: "s",
    selectedYear: "2018",
    selectedModule: "",
    selectedVariant: "1",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_MODULES":
        return { ...state, modules: action.payload };
      case "SELECT_SEASON":
        return { ...state, selectedSeason: action.payload };
      case "SELECT_YEAR":
        return { ...state, selectedYear: action.payload };
      case "SELECT_MODULE":
        return { ...state, selectedModule: action.payload };
      case "SELECT_VARIANT":
        return { ...state, selectedVariant: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const [selectedModuleState, setSelectedModuleState] = useState("");
  const [modulesArr, setModulesArr] = useState([]);
  const [questions, setQuestions] = useState([]);

  const getModules = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8000/addQuestion/getModulesForPastPaper"
      );

      dispatch({ type: "FETCH_MODULES", payload: response.data });
      dispatch({
        type: "SELECT_MODULE",
        payload: response.data[0]["sourceKey"],
      });

      setSelectedModuleState(response.data[0]["source"]);

      const sourceValues = Object.values(response.data).map(
        (obj) => obj.source
      );

      setModulesArr(sourceValues);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:8000/getQuestionsOnTopic",
        {
          selectedModule: state.selectedModule,
          selectedVariant: state.selectedVariant,
          selectedYear: state.selectedYear,
          selectedSeason: state.selectedSeason,
        }
      );

      if (response.data.length === 0) {
        alert("No questions found under this past paper!");
        return;
      }
      setQuestions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getModules();
  }, []);

  const handleModuleChange = (event) => {
    for (let i = 0; i < state.modules.length; i++) {
      if (state.modules[i].source === event.target.value) {
        dispatch({
          type: "SELECT_MODULE",
          payload: state.modules[i].sourceKey,
        });

        setSelectedModuleState(state.modules[i].source);
        break;
      }
    }
  };

  const handleSeasonChange = (event) => {
    dispatch({ type: "SELECT_SEASON", payload: event.target.value });
  };

  const handleYearChange = (event) => {
    dispatch({ type: "SELECT_YEAR", payload: event.target.value });
  };

  const handleVariantChange = (event) => {
    dispatch({ type: "SELECT_VARIANT", payload: event.target.value });
  };

  return (
    <div>
      {modulesArr.length > 0 && (
        <>
          <select
            id="moduleDropdown"
            onChange={handleModuleChange}
            value={selectedModuleState}
          >
            {modulesArr.map((module, index) => (
              <option key={`module_${index}`} value={module}>
                {module}
              </option>
            ))}
          </select>

          <select id="yearDropdown" onChange={handleYearChange}>
            {Array.from({ length: 5 }, (_, i) => (
              <option key={`year_${2018 + i}`} value={2018 + i}>
                {2018 + i}
              </option>
            ))}
          </select>

          <select id="seasonDropDown" onChange={handleSeasonChange}>
            <option value="s">May/June</option>
            <option value="w">October/November</option>
          </select>

          <select id="variantDropDown" onChange={handleVariantChange}>
            {Array.from({ length: 3 }, (_, i) => (
              <option key={`variant_${i + 1}`} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <p>
            Selected Module:{" "}
            <strong>
              {state.selectedModule === "p1"
                ? "Pure Mathematics 1"
                : "Probability and Statistics I"}
            </strong>
          </p>
          <p>
            Selected Season:{" "}
            {state.selectedSeason === "s" ? "May/June" : "October/November"}
          </p>
          <p>
            Selected Year: <strong>{state.selectedYear}</strong>
          </p>

          <p>
            Selected Variant: <strong>{state.selectedVariant}</strong>
          </p>

          <button onClick={fetchQuestions}>Get Past Paper</button>

          {questions && questions.length > 0 ? (
            <ul>
              {questions.map((question, i) => (
                <li key={i}>
                  <p>{question.questionID}</p>
                  <p>{question.questionTopic}</p>
                  <p>{question.questionsGrid}</p>
                  <p>{question.questionsFiguresGrid}</p>
                  <p>{question.answersTypeGrid}</p>
                  <p>{question.answersGrid}</p>
                  <p>{question.marksGrid}</p>
                  <p>{question.questionSource}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No questions found</p>
          )}
        </>
      )}
    </div>
  );
};

export default PastPaperScope;
