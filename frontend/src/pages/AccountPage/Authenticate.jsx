/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";

export default function Authenticate() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const authenticated = async () => {
      try {
        const response = await axios.post("http://localhost:8000/register", {
          user,
        });
        console.log("Response:", response.data);
        if (response.data) {
          setIsAuthenticated(true);
        } else {
          alert("You have not logged in !");
        }
      } catch (error) {
        console.error("Authentication check failed", error);
      } finally {
        setIsLoading(false);
      }
    };
    authenticated();
  }, [user]);

  if (isLoading) {
    return <h1>Loading!</h1>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <h1>You have Logged In!</h1>
      ) : (
        <h1>You have not logged In!</h1>
      )}
    </div>
  );
}
