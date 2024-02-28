/* eslint-disable no-unused-vars */
import  { useContext, useState } from "react";
import Axios from "axios";
import NavBar from "../NavigationBar/navBar";
import Authenticate from "./Authenticate";
import { UserContext } from "../../App";


function Login() {
  // Note: Component names should start with a capital letter

  const { user,setUser } = useContext(UserContext);

  const apiUrl = "http://localhost:8000/registration/login";

  const handleChange = (e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await Axios.post(apiUrl, {
      user
      });

      console.log("The data is " + response);
      if (response.data) {
        alert("You have successfully logged in!");
        console.log(user.username);
        localStorage.setItem('username', user.username);
        localStorage.setItem('password', user.passsword);
        
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <NavBar />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Enter the username:</label>
          <input
            name="username"
            type="text"
            value={user.username}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="password">Enter the password:</label>
          <input
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
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
