import  { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UnknownPage from "./components/Unknown";
import Learn from "./components/Learn/Learn";
import AddStudy from "./components/Learn/AddStudy"


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
            <Route path="/resources" element={<Learn/>}></Route>
            <Route path="/addresources" element={<AddStudy/>}></Route>
            <Route path="*" element={<UnknownPage />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
