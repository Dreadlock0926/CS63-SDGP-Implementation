import  { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/home";
import Progressionmark from "./components/graphs/Progressionmark";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import Login from "./pages/LoginPage/login";
import AddQuestionsPage from "./pages/addQuestionsPage/addQuestions";
import ErrorPage from "./components/Error404/ErrorPage";

export const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState([]);

  // Structuring the context value explicitly
  const contextValue = {
    loading: loading,
    setLoading: setLoading,
    value: value,
    setValue: setValue
  };

  return (
    <>
      <UserContext.Provider value={(loading, setLoading)}>
        <BrowserRouter p>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/progression" element={<Progressionmark />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="add-questions" element={<AddQuestionsPage />}/>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
