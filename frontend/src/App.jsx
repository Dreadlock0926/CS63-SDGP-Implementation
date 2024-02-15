import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/home";
import Login from "./pages/AccountPage/login";
import Register from "./pages/AccountPage/register";
import ErrorPage from "./components/Error404/ErrorPage";
import Gemini from "./components/Gemini/Gemini";

export const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);
  const [logged,setLogged] = useState(false); //let's pass this over but context doesn't work atm so once that's figured lets't use this instead (Homepage)
  const [status,setStatus] = useState("")
  return (
    <>
      <UserContext.Provider value={(loading, setLoading,logged,setLogged,status,setStatus)}>
        <BrowserRouter >
        <Gemini/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register/>}/>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
