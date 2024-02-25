import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";

export default function Authenticate() {
  const [user, setUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { username, password } = useContext(UserContext);

  useEffect(() => {
    const authenticated = async () => {
      try {
       
        const response = await axios.post(
          "http://localhost:8000/registration/api/auth/status",
          { username, password }
        );
        console.log("Valid User" + response.data);
        console.log(`the response is  ${response}`);
        if (response.data) {
          setUser(response.data); // Store user data on successful authentication
          setIsAuthenticated(true);
        } else {
          alert("You have not logged in !");
        }
      } catch (error) {
        console.error("Authentication check failed", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    authenticated();
  }, [username,password]);

  if (isLoading) {
    return <h1>Loading !</h1>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <h1>You have Logged In ! </h1>
      ) : (
        <h1>You have not logged In ! </h1>
      )}
    </div>
  );
}
