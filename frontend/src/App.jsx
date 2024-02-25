import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/home";
import Login from "./pages/LoginPage/login";
import AddQuestionsPage from "./pages/addQuestionsPage/addQuestions";
import ErrorPage from "./components/Error404/ErrorPage";
import ExamQuestionTest from "./pages/TestPages/ExamQuestionTest";
import Scope from "./pages/TestPages/Scope";
import ExamFinalized from "./pages/TestPages/ExamFinal";
import Finalized from "./pages/TestPages/Finalized";

export const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);
  const [outcome,setOutcome] = useState([]);
  const [marks,setMarks] = useState(0)

  const userData = {
    loading, setLoading,outcome,setOutcome,marks,setMarks
  }

  return (
    <>
      <UserContext.Provider value={userData}>
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="add-questions" element={<AddQuestionsPage />}/>
            <Route path="exam-test-page" element={<ExamQuestionTest />}/>
            <Route path="finalized" element={<Finalized/>}/>
            <Route path="/examfinal" element={<ExamFinalized/>}></Route> {/**Incomplete */}
            <Route path="/scope" element={<Scope/>}></Route> {/**Radhul is working on this */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
