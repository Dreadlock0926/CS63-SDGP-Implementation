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

export const UserContext = createContext();

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loggedInUser, setLoggedInUser] = useState({});

  const [userExams, setUserExams] = useState([{}]);

  // Structuring the context value explicitly
  const contextValue = {
    loading,
    setLoading,
    value,
    setValue: setValue,
    data,
    setData,
    loggedInUser,
    setLoggedInUser,
    isAuthenticated,
    setIsAuthenticated,
    userExams,
    setUserExams,
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
          <Route path="*" element={<UnknownPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
