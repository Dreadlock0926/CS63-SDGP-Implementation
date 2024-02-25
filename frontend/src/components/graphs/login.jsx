import React, { useContext, useState } from "react";
import axios from "axios";
import NavBar from "../NavigationBar/navBar";
import Authenticate from "./Authenticate";
import { UserContext } from "../../App";


function Login() {
  // Note: Component names should start with a capital letter
  
  const { username,setUserName,password,setPassword } = useContext(UserContext);
  const [user, setUser] = useState(false);
  const apiUrl = "http://localhost:8000/registration/login";

  const handleUsername = (e) => {
    setUserName(e.target.value);
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
      if (response.data) {
        alert("You have successfully logged in!");
        console.log(response.data.username);
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
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
