/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";

export default function Authenticate() {
  const { user, loading,setLoading,isAuthenticated, setIsAuthenticated, setData } = useContext(UserContext);

  useEffect(() => {
    const authenticated = async () => {
      try { 
        const {data} = await Axios.post(
          "http://localhost:8000/registration/api/auth/status",
          user
        );
        console.log("Valid User" + data);
        if (data) {
          setData(data); // Store user data on successful authentication
          setIsAuthenticated(true);
        } else {
          alert("You have not logged in !");
        }
      } catch (error) {
        console.error("Authentication check failed", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    authenticated();
  }, [user.username,user.password]);

  if (loading) {
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
