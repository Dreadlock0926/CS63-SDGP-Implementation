import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/home";
import Login from "./pages/LoginPage/login";
import AddQuestionsPage from "./pages/addQuestionsPage/addQuestions";
import ErrorPage from "./components/Error404/ErrorPage";
import ExamPage from "./pages/ExamPage/examPage";

const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <UserContext.Provider value={(loading, setLoading)}>
        <BrowserRouter p>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="add-questions" element={<AddQuestionsPage />}/>
            <Route path="exampage" element={<ExamPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
