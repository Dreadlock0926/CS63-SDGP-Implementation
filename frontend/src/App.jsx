import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/graphs/Home";
import UnknownPage from "./components/Unknown";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import ForgotPass from "./components/User/Forgot";
import Gemini from "./components/Gemini/Gemini";
import Forum from "./components/Forum/Forum";
import CreateForum from "./components/Forum/CreateForum";
import ExamPage from "./components/Exam/exam";
import ExamFinalized from "./components/Exam/ExamFinalized";
import Dashboard from "./components/Dashboard/Dashboard";
import Learn from "./components/LearningResources/Learn";
import AddStudy from "./components/LearningResources/AddStudy";
import General from "./components/General";
import StatPage from "./components/Math/Stat/StatPage";
import PureMath from "./components/Math/PureMath/PureMath";
import AddStat from "./components/Math/Stat/AddStat";
import AddPure from "./components/Math/PureMath/AddPure";
import Haseeb from "./components/Exam/ExamHasseb";
import Radhul from "./components/Exam/ExamRadhul";

export const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState(false);
  const [user, setUser] = useState("");
  const [status, setStatus] = useState("");

  const [response, setResponse] = useState("");

  return (
    <>
      <Gemini />
      {/**Needs to generally exist on the side with a popup type scenario! */}
      <BrowserRouter>
        <UserContext.Provider
          value={{
            loading,
            setLoading,
            log,
            setLog,
            user,
            setUser,
            status,
            setStatus,
            response,
            setResponse,
          }}
        >
          <General />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addstat" element={<AddStat />}></Route>
            <Route path="/stat" element={<StatPage />}></Route>
            <Route path="/puremath" element={<PureMath />}></Route>
            <Route path="/addpure" element={<AddPure />}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<ForgotPass />} /> {/**Optional */}
            <Route path="/dash" element={<Dashboard />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/addforum" element={<CreateForum />} />
            <Route path="/exam" element={<ExamPage />} />
            <Route path="/haseeb" element={<Haseeb />}></Route>
            <Route path="/radhul" element={<Radhul />}></Route>
            <Route path="/examfinal" element={<ExamFinalized />} />
            <Route path="/resources" element={<Learn />} />
            <Route path="/addresources" element={<AddStudy />} />
            <Route path="*" element={<UnknownPage />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
