/* eslint-disable no-unused-vars */
import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/home";
import UnknownPage from "./components/Error404/Unknown";
import Progressionmark from "./components/graphs/Progressionmark";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import Login from "./components/graphs/login";
import Regstration from "./components/graphs/Regstration";

export const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [voxalPoints, setVoxalpoints] = useState(0);
  const [hours, setHours] = useState(0);
  const [progress, setProgress] = useState([]);
  const [statValue, setStatValue] = useState([]); // corrected typo here
  const [course, setCourse] = useState(0);
  const [logged,setLogged]  = useState(false)
  const [ongoingCourses, setOngoingCourses] = useState(0); // corrected function name here
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [value,setValue] = useState([])
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  // Structuring the context value explicitly
  const contextValue = {
    loading,
    setLoading,
    data,
    setData,
    voxalPoints,
    setVoxalpoints,
    hours,
    setHours,
    progress,
    setProgress,
    statValue,
    setStatValue,
    course,
    setCourse,
    ongoingCourses,
    setOngoingCourses,
    user,logged,setLogged,
    setUser,
    isAuthenticated,
    setIsAuthenticated,value,setValue
  };

  return (
    <UserContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/progression" element={<Progressionmark />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Regstration />} />
          <Route path="*" element={<UnknownPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
