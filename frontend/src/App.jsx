import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/home";
import Login from "./pages/LoginPage/login";
import UnknownPage from "./components/Error404/Unknown";
import Gemini from "./components/Gemini/Gemini";
import ForgotPass from "./pages/Forgot";

const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <UserContext.Provider value={(loading, setLoading)}>
        <BrowserRouter p>
          <Gemini />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="/forgot" element={<ForgotPass />}></Route>
            <Route path="*" element={<UnknownPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
