import  { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/home";
import Login from "./pages/AccountPage/login";
import Register from "./pages/AccountPage/register";
import ErrorPage from "./components/Error404/ErrorPage";
import ModalTest from "./pages/ModalTest";
import Gemini from "./components/Gemini/Gemini";

export const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);
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
      <UserContext.Provider value={userContextValue}>
        <Gemini/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="mod" element={<ModalTest />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
