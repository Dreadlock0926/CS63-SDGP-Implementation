/* eslint-disable no-unused-vars */
import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/home";
import UnknownPage from "./components/Error404/ErrorPage";
import Progressionmark from "./components/graphs/Progressionmark";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import Login from "./pages/AccountPage/login";
import Register from "./pages/AccountPage/register";
import Authenticate from "./pages/AccountPage/Authenticate";
import AddQuestionsPage from "./pages/addQuestionsPage/addQuestions";
import Scope from "./pages/TestPages/Scope";
import FeedbackPage from "./pages/FeedbackPage/FeedbackPage";
import ExamPage from "./pages/ExamPage/ExamPage";
import SelectCourses from "./pages/SelectCoursesPage/SelectCourses";
import SpecificCourse from "./pages/SelectCoursesPage/SpecificCourse";
import Learn from "./components/Learn/Learn";
import LearnBlueprint from "./components/Learn/LearnBlueprint";
import LearningResource from "./components/Learn/LearningResource";
import LearnClicked from "./components/Learn/LearnClicked";
export const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState([]);
  const [data, setData] = useState([]);
  const [voxalPoints, setVoxalpoints] = useState(0);
  const [hours, setHours] = useState(0);
  const [progress, setProgress] = useState([]);
  const [statValue, setstatValue] = useState([]);
  const [course, setCourse] = useState(0);
  const [ongoingCourse, setongoingCourses] = useState(0);
  const [user, setUser] = useState({ username: "", password: "" });
  const [completeCourse, setCompleteCourse] = useState(0);
  const [hoursLearned, setHoursLearned] = useState(0);
  const [pureMathLearnedProgress, setPureMathLearnedProgress] = useState(0);
  const [statLearnedProgress, setStatLearnedProgress] = useState(0);
  const [mathLesson, setMathLesson] = useState(0);
  const [statlLesson, setStatLesson] = useState(0);
  const [status, setStatus] = useState("");
  const [response, setResponse] = useState("");
  const [theTopic, setTheTopic] = useState("");
  const [falseTopics, setFalseTopics] = useState([]);
  const [source, setSource] = useState("");
  const [theProgressVal, setTheProgressVal] = useState(0);
  const [specificTopic, setSpecificTopic] = useState("");
  const [topicRelated, setTopicRelated] = useState([]);

  const BASE = "http://localhost:8000";

  const [loggedInUser, setLoggedInUser] = useState({});

  // Structuring the context value explicitly
  const contextValue = {
    loggedInUser,
    setLoggedInUser,
    loading,
    setLoading: setLoading,
    value,
    setValue: setValue,
    data,
    setData,
    voxalPoints,
    setVoxalpoints,
    hours,
    isAuthenticated,
    setIsAuthenticated,
    setHours,
    progress,
    setProgress,
    statValue,
    setstatValue,
    course,
    setCourse,
    ongoingCourse,
    setongoingCourses,
    user,
    setUser,
    source,
    setStatus,
    response,
    setResponse,
    theTopic,
    setTheTopic,
    BASE,
    status,
    theProgressVal,
    setTheProgressVal,
    specificTopic,
    setSpecificTopic,
    topicRelated,
    setTopicRelated,
    setSource,
    falseTopics,
    setFalseTopics,
  };

  return (
    <UserContext.Provider value={contextValue}>
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <Routes>
            <Route path="/resources" element={<Learn />} />
            <Route
              path="/learning/:source/:topic/:lesson"
              element={<LearningResource />}
            ></Route>
            {/* <Route path="/:lesson" element={<First />} /> */}
            <Route path="/learnprint" element={<LearnBlueprint />}></Route>
            <Route path="*" element={<UnknownPage />} />
          </Routes>
        </UserContext.Provider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/progression" element={<Progressionmark />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Register />} />
          <Route path="/authenticate" element={<Authenticate />} />
          <Route path="add-questions" element={<AddQuestionsPage />} />
          <Route path="/select-course" element={<SelectCourses />} />
          <Route path="/select-course/:theTopic" element={<SpecificCourse />} />
          <Route path="/resources" element={<Learn />} />
          <Route path="/materials" element={<LearningResource />}></Route>
          <Route
            path="/materials/:index"
            element={<LearningResource />}
          ></Route>
          <Route path="/addresources" element={<AddStudy />} />
          <Route path="/nextpage" element={<NextPage />} />
          <Route path="/anything" element={<Anything />} />
          <Route
            path="/learnclicked/:lesson"
            element={<LearnClicked />}
          ></Route>
          <Route path="/learnprint" element={<LearnBlueprint />}></Route>
          <Route path="exam" element={<ExamPage />} />
          <Route path="/scope" element={<Scope />}></Route>
          {/**Radhul is working on this */}
          <Route path="/feedback" element={<FeedbackPage />}></Route>
          <Route path="*" element={<UnknownPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
