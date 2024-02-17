import  { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UnknownPage from "./components/Unknown";
import Learn from "./components/Learn/Learn";
import AddStudy from "./components/Learn/AddStudy";
import LearningPureMaths from "./components/Learn/LearnPureMaths";
import LearningStatistics from "./components/Learn/LearnStat";

export const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);
  const [logged,setLogged] = useState(true);
  const [user, setUser] = useState("");
  const [status, setStatus] = useState("");
  const [response, setResponse] = useState("");

  // Create an object with the states and setter functions
  const userContextValue = {
    loading: loading,
    setLoading: setLoading,
   logged:logged,
   setLogged:setLogged,
    user: user,
    setUser: setUser,
    status: status,
    setStatus: setStatus,
    response: response,
    setResponse: setResponse
  
  };

  return (
    <>
      {/**Needs to generally exist on the side with a popup type scenario! */}
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <Routes>
            <Route path="/resources" element={<Learn />} />
            <Route path="/addresources" element={<AddStudy />} />
            <Route path="learning-pure" element={<LearningPureMaths/>}></Route>
            <Route path="learning-stat" element={<LearningStatistics/>}></Route>
            <Route path="*" element={<UnknownPage />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
