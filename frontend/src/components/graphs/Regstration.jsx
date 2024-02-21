import React, { useEffect, useState } from "react";
import axios from "axios";

function Regstration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = "http://localhost:8000/registration/registration";

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    const fetchData = async () => {
      try {
        const response = await axios.post(apiUrl, { username, password });
        console.log(response.data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  };

  return (
    <form>
      <div>
        <label htmlFor="">Enter the username :</label>
        <input type="text" value={username} onChange={handleUsername} />
        <br />
        <label htmlFor="">Enter the password :</label>
        <input type="password" value={password} onChange={handlePassword} />
      </div>
      <button type="submit" onClick={handleSubmit}>Register</button>
    </form>
  );
}

export default Regstration;
