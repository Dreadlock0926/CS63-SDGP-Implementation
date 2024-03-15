import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/home";
import Login from "./pages/LoginPage/login";
import AddQuestionsPage from "./pages/addQuestionsPage/addQuestions";
import ErrorPage from "./components/Error404/ErrorPage";
import Forum from "./components/Forum/Forum";
import CreateForum from "./components/Forum/CreateForum";
import ForumSearch from "./components/Forum/ForumSearch";

export const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState(true);
  const [user, setUser] = useState("Guest");
  const [status, setStatus] = useState("");
  const userData = {
    loading: loading,
    status,
    setStatus,
    setLoading: setLoading,
    logged: logged,
    setLogged: setLogged,
    user,
    setUser,
  };

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={userData}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="add-questions" element={<AddQuestionsPage />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/forumsearch" element={<ForumSearch />} />
            <Route path="/addforum" element={<CreateForum />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
