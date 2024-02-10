import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/home";
import Login from "./pages/LoginPage/login";
import UnknownPage from "./components/Error404/Unknown";
import Gemini from "./components/Gemini/Gemini";
import ForgotPass from "./pages/Forgot";
import Progressionmark from "./components/graphs/Progressionmark";

const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <UserContext.Provider value={(loading, setLoading)}>
        <BrowserRouter p>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="login" element={<Login />} />
            <Route path="/forgot" element={<ForgotPass />}></Route>
            <Route path="/progression" element={<Progressionmark/>}></Route>
            <Route path="*" element={<UnknownPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
