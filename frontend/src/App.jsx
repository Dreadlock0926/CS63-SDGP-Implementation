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
import SelectCourses from "./pages/SelectCoursesPage/SelectCourses";
import SpecificCourse from "./pages/SelectCoursesPage/SpecificCourse";
import Learn from "./components/Learn/Learn";
import AddStudy from "./components/Learn/AddStudy";
import LearnBlueprint from "./components/Learn/LearnBlueprint";
import LearningResource from "./components/Learn/LearningResource";
import ExamReceipt from "./pages/ExamPage/ExamReceipt/ExamReceipt";
import ExamHistory from "./pages/ExamPage/ExamHistoryPage/ExamHistory";
import ExamReview from "./pages/ExamPage/ExamReview/ExamReview";
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
  const [pureMathLearnedProgress, setPureMathLearnedProgress] = useState(null);
  const [pureLessonCount,setPureLessonCount] = useState(0);
  const [statLessonCount,setStatLessonCount] = useState(0);
  const [statLearnedProgress, setStatLearnedProgress] = useState(null);
  const [mathLesson, setMathLesson] = useState(0);
  const [statlLesson, setStatLesson] = useState(0);
  const [status, setStatus] = useState("");
  const [testedPureProgress, setPureTestedProgress] = useState(0);
  const [testedStatProgress, setStatTestedProgress] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId,setUserId] = useState('');
  const [totalAnswers,setTotalAnswers] = useState([]);
  const [examHistory,setExamHistory] = useState([]);
  const [statisticsMarks, setStatisticsMarks] = useState([]);
  const [mathematicsMarks, setMathematicsMarks] = useState([]);
  const [totalMathsmarks,setTotalMathsmark] = useState([]);
  const [totalStatMarks,setTotalStatMarks] = useState([]);
  const [totalMarks,setTotalMarks] = useState([]);

  const [loggedInUser, setLoggedInUser] = useState({
    _id: "", // Exam ID
  examType: "", // Type of the exam
  examQuestions: [], // Array of exam questions
  userRef: "", // Reference to the user ID (loggedInUser._id)
  userAnswers: [], // Array of user's answers
  examModule: "", // Module of the exam
  examTopic: "", // Topic of the exam
  mark: null, // User's mark for the exam
  totalMark: null, // Total mark of the exam
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
    setTotalAnswers,
    pureLessonCount,
    setPureLessonCount,
    statLessonCount,setStatLessonCount,
    examHistory,setExamHistory,
    statisticsMarks, setStatisticsMarks,
    mathematicsMarks, setMathematicsMarks,
    totalMathsmarks,setTotalMathsmark,
    totalStatMarks,setTotalStatMarks,
    totalMarks,setTotalMarks
    
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
          <Route path="/learnprint" element={<LearnBlueprint />}></Route>
          <Route path="exam" element={<ExamPage />} />
          <Route path="receipt" element={<ExamReceipt />} />
          <Route path="/examfinal" element={<ExamFinalized />}></Route>{" "}
          <Route path="/exam-history" element={<ExamHistory />}></Route>
          <Route path="/exam-review/:examID" element={<ExamReview />}></Route>
          <Route path="/scope" element={<Scope />}></Route>{" "}
          <Route path="/feedback" element={<FeedbackPage />}></Route>
          <Route path="*" element={<UnknownPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
