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
import ErrorPage from "./components/Error404/ErrorPage";
import ExamQuestionTest from "./pages/TestPages/ExamQuestionTest";
import Scope from "./pages/TestPages/Scope";
import ExamFinalized from "./pages/TestPages/ExamFinal";
import FeedbackPage from "./pages/FeedbackPage/FeedbackPage";
import ExamPage from "./pages/ExamPage/ExamPage";
import ExamReceipt from "./pages/ExamPage/ExamReceipt/ExamReceipt";
import Displaygraph from "./components/graphs/Displaygraph";


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
  const [testedPureProgress, setPureTestedProgress] = useState(0);
  const [testedStatProgress, setStatTestedProgress] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId,setUserId] = useState('');
  const [totalAnswers,setTotalAnswers] = useState([]);

  const [loggedInUser, setLoggedInUser] = useState({
    _id: "", // User ID
    username: "", // Username
    password: "", // Password (typically not stored in front-end state for security reasons)
    voxelPoints: 0, // Typo corrected from 'voxel' to match your schema; adjust as necessary
    courses: [], // Array to store ongoing courses
    completedCourses: [], // Array to store completed courses
    correctQuestions: [], // Array to store IDs or details of correctly answered questions
    wrongQuestions: [], // Array to store IDs or details of incorrectly answered questions
    feedbackExams: [], // Array to store feedback from exams
    topicalExams: [], // Array to store topical exam details
    createdAt: "", // Date string of when the user was created
    updatedAt: "", // Date string of the last update to the user profile
    __v: 0, // Version key for MongoDB (if using Mongoose)
    topicProbabilities: {}, // Object to store topic probabilities; structure depends on further details
    lessons: [], // Array to store lesson progress; structure depends on further details
    // Additional fields based on your initial setup
  });

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
    hoursLearned,
    setHoursLearned,
    completeCourse,
    setCompleteCourse,
    statLearnedProgress,
    setStatLearnedProgress,
    pureMathLearnedProgress,
    setPureMathLearnedProgress,
    mathLesson,
    setMathLesson,
    statlLesson,
    setStatLesson,
    status,
    setStatus,
    testedPureProgress,
    setPureTestedProgress,
    testedStatProgress,
    setStatTestedProgress,
    userId,
    setUserId,
    totalAnswers,
    setTotalAnswers
  };

  return (
    <UserContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/progression" element={<Progressionmark />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Register />} />
          <Route path="/authenticate" element={<Authenticate />} />
          <Route path="add-questions" element={<AddQuestionsPage />}/>
          <Route path="exam" element={<ExamPage />}/>
          <Route path="receipt" element={<ExamReceipt />}/>
          <Route path="/examfinal" element={<ExamFinalized/>}></Route> {/**Incomplete */}
          <Route path="/scope" element={<Scope/>}></Route> {/**Radhul is working on this */}
          <Route path="/feedback" element={<FeedbackPage/>}></Route>
          <Route path= "/didplayGraph" element={<Displaygraph/>}></Route>
          
          <Route path="*" element={<UnknownPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
