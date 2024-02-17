import  { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/home";
import UnknownPage from "./components/Error404/Unknown";
import Progressionmark from "./components/graphs/Progressionmark";
import DashboardPage from "./pages/DashboardPage/DashboardPage";

export const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState([]);
  const [data, setData] = useState(null);
  const [voxalPoints, setVoxalpoints] = useState(0);
  const [hours,setHours] = useState(0);
  const [progress,setProgress] = useState([])

  // Structuring the context value explicitly
  const contextValue = {
    loading: loading,
    setLoading: setLoading,
    value: value,
    setValue: setValue,data,setData,voxalPoints,setVoxalpoints,hours,setHours,progress,setProgress
  };

  return (
    <UserContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/progression" element={<Progressionmark  />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<UnknownPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
