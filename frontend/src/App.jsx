import  { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/home";
import AddQuestionsPage from "./pages/addQuestionsPage/addQuestions";
import ErrorPage from "./components/Error404/ErrorPage";
import Scope from "./pages/TestPages/Scope";
import ExamFinalized from "./pages/TestPages/ExamFinal";
import FeedbackPage from "./pages/FeedbackPage/FeedbackPage";
import ExamPage from "./pages/ExamPage/ExamPage";
import Login from "./pages/AccountPage/login";
import Register from "./pages/AccountPage/register";

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
            <Route path="register" element={<Register />} />
            <Route path="add-questions" element={<AddQuestionsPage />}/>
            <Route path="exam" element={<ExamPage />}/>
            <Route path="/examfinal" element={<ExamFinalized/>}></Route> {/**Incomplete */}
            <Route path="/scope" element={<Scope/>}></Route> {/**Radhul is working on this */}
            <Route path="/feedback" element={<FeedbackPage/>}></Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
