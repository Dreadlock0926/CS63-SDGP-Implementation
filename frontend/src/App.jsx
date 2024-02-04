import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/graphs/Home";
import UnknownPage from "./components/Unknown";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import ForgotPass from "./components/User/Forgot";
import Gemini from "./components/Gemini/Gemini";

export const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState(false);
  const [user, setUser] = useState("");
  const [status, setStatus] = useState("");

  return (
    <>
      <UserContext.Provider
        value={
          (loading, setLoading, log, setLog, user, setUser, status, setStatus)
        }
      >
        <Gemini />{" "}
        {/**Needs to generally exist on the side with a popup type scenario! */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/forgot" element={<ForgotPass />}></Route>
            <Route path="*" element={<UnknownPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
