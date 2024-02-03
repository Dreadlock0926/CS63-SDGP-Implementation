import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/graphs/Home";
import UnknownPage from "./components/Unknown";

const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <UserContext.Provider value={(loading, setLoading)}>
        <BrowserRouter p>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<UnknownPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
