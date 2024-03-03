import  { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/home";
import AddQuestionsPage from "./pages/addQuestionsPage/addQuestions";
import Login from "./pages/AccountPage/login";
import Register from "./pages/AccountPage/register";
import ErrorPage from "./components/Error404/ErrorPage";
import Gemini from "./components/Gemini/Gemini";
import ModalTest from "./pages/ModalTest";
import ExamQuestionTest from "./pages/TestPages/ExamQuestionTest";
import Scope from "./pages/TestPages/Scope";
import ExamFinalized from "./pages/TestPages/ExamFinal";

export const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);
  const [outcome,setOutcome] = useState([]);
  const [marks,setMarks] = useState(0)

  const userData = {
    loading, setLoading,outcome,setOutcome,marks,setMarks
  }
  const [logged, setLogged] = useState(false);
  const [status, setStatus] = useState("");
  const [user,setUser] = useState("")

 
  const userContextValue = {
    loading: loading,
    setLoading: setLoading,
    logged: logged,
    setLogged: setLogged,
    status: status,
    setStatus: setStatus,
    user,setUser
  };

  return (
    <>
      <UserContext.Provider value={userData}>
        <BrowserRouter >
          <Routes>
            <Route path="register" element={<Register />} />
            <Route path="mod" element={<ModalTest />} />
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="add-questions" element={<AddQuestionsPage />}/>
            <Route path="exam-test-page" element={<ExamQuestionTest />}/>
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
