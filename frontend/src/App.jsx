import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/home";
import Login from "./pages/LoginPage/login";
import AddQuestionsPage from "./pages/addQuestionsPage/addQuestions";
import ErrorPage from "./components/Error404/ErrorPage";

const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
     
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
           response,setResponse
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="add-questions" element={<AddQuestionsPage />}/>
            <Route path="/forum" element={<Forum />} />
            <Route path="/addforum" element={<CreateForum />} />
            <Route path="*" element={<UnknownPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
