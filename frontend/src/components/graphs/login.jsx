import React, { useState } from "react";
import axios from "axios";
import NavBar from "../NavigationBar/navBar";
import Authenticate from "./Authenticate";

function Login() {
  // Note: Component names should start with a capital letter
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(false);
  const apiUrl = "http://localhost:8000/registration/login";

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post(apiUrl, {
        username,
        password,
      });
      console.log("The data is " + response);
      if (response.status === 200) {
        alert("You have successfully logged in!");
        setUser(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <NavBar />

      <form onSubmit={handleSubmit}>
        {" "}
        {/* Change here */}
        <div>
          <label htmlFor="username">Enter the username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={handleUsername}
          />
          <br />
          <label htmlFor="password">Enter the password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <button type="submit">Login</button>{" "}
        {/* Changed to a proper submit button */}
      </form>
      {user ? (
        <Authenticate />
      ) : (
        <>
          <h1>Nothing here !</h1>
        </>
      )}
    </>
  );
}

export default Login;
