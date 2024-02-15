import  { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/graphs/Home";
import UnknownPage from "./components/Unknown";
import Forum from "./components/Forum/Forum";
import CreateForum from "./components/Forum/CreateForum";


export const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState(false);
  const [user, setUser] = useState("");
  const [status, setStatus] = useState("");

  const [response, setResponse] = useState("");




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
            <Route path="/forum" element={<Forum />} />
            <Route path="/addforum" element={<CreateForum />} />
            <Route path="*" element={<UnknownPage />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
