/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import Axios from "axios";

const CreateForum = () => {
  const [forum, setForum] = useState({ question: "", answer: "", topic: "", rating: 1 });

  const handleChange = (e) => {
    setForum({ ...forum, [e.target.name]: e.target.value });
  };

  async function createQuestions(e) {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:8000/forum", forum);
      if(response.status===201){
        alert("Added question!")
      }else if(response.status===409){
        alert("Question was already posted!")
      }
    } catch (err) {
      console.error(err);
    }
  }

  const { logged, setLogged } = useContext(UserContext);

  return (
    logged ? (
      <div>
        <h1>Add Something to the forum!</h1>
        <form onSubmit={createQuestions}>
          <input onChange={handleChange} name="question" placeholder="Enter Question..." required />
          <input onChange={handleChange} name="answer" placeholder="Enter Answer..." />
          <input onChange={handleChange} name="topic" placeholder="Enter Topic..." required />
          <input onChange={handleChange} name="rating" placeholder="Enter Rating..." type="number" value={forum.rating} min={1} />
          <button type="submit">Add Resource!</button>
        </form>
        <Link to="/forum">Check Forum!</Link>
      </div>
    ) : (
      <div>
        <Link to="login">Please Login to Continue!</Link>
      </div>
    )
  );
};

export default CreateForum;
