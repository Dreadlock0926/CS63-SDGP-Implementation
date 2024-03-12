/* eslint-disable no-unused-vars */
import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route, useNavigation } from "react-router-dom";
import UnknownPage from "./components/Unknown";
import Learn from "./components/Learn/Learn";
import AddStudy from "./components/Learn/AddStudy";
import LearningPureMaths from "./components/Learn/LearnPureMaths";
import LearningStatistics from "./components/Learn/LearnStat";
import LearnBlueprint from "./components/Learn/LearnBlueprint";
import LearningResource from "./components/Learn/LearningResource";

export const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState(true);
  const [user, setUser] = useState("");
  const [status, setStatus] = useState("");
  const [response, setResponse] = useState("");
  const [theTopic, setTheTopic] = useState("");

  // const navigator = useNavigation();

  // Create an object with the states and setter functions
  const userContextValue = {
    loading,
    setLoading,
    logged,
    setLogged,
    user,
    setUser,
    status,
    setStatus,
    response,
    setResponse,
    theTopic,
    setTheTopic,
  };

  return (
    <>
      {/**Needs to generally exist on the side with a popup type scenario! */}
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <Routes>
            <Route path="/resources" element={<Learn />} />
            <Route path="/material" element={<LearningResource/>}></Route>
            <Route path="/addresources" element={<AddStudy />} />
            <Route path="learning-pure" element={<LearningPureMaths />}></Route>
            <Route path="/learnprint" element={<LearnBlueprint/>}></Route>
            <Route
              path="learning-pure/:id"
              element={<LearningPureMaths />}
            ></Route>
            <Route
              path="learning-stat"
              element={<LearningStatistics />}
            ></Route>
            <Route
              path="learning-stat/:id"
              element={<LearningStatistics />}
            ></Route>
            <Route path="*" element={<UnknownPage />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
