import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/home";
import UnknownPage from "./components/Error404/Unknown";
import Progressionmark from "./components/graphs/Progressionmark";
import DashboardPage from "./pages/DashboardPage/DashboardPage"

const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <UserContext.Provider value={(loading, setLoading)}>
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/progression" element={<Progressionmark/>}></Route>
            <Route path="/dashboard" element={<DashboardPage />}></Route>
            <Route path="*" element={<UnknownPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
