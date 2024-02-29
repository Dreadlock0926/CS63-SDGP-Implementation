import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import Axios from "axios";

const CreateForum = () => {
  const [forum, setForum] = useState({ question: "", topic: "Pure Mathematics I", rating: 1 });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setForum({ ...forum, [e.target.name]: e.target.value });
  };

  async function createQuestions(e) {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:8000/forum", forum);
      if (response.status === 201) {
        setSuccessMessage("Question added successfully!");
        setForum({ question: "", answer: "", topic: "Pure Mathematics I", rating: 1 }); // Clear the form after successful submission
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setErrorMessage("Question was already posted!");
      } else {
        setErrorMessage("An error occurred while processing your request. Please try again later.");
      }
      console.error(err);
    }finally{
      setForum(forum.topic==="Pure Mathematics I")
    }
  }

  useEffect(()=>{
    console.log(forum.topic);
  },[forum.topic])

  const { logged } = useContext(UserContext);

  return (
    <div>
      {logged ? (
        <>
          <h1>Add Something to the forum!</h1>
          <form onSubmit={createQuestions}>
            <input onChange={handleChange} name="question" value={forum.question} placeholder="Enter Question..." required maxLength={20} />
            <input onChange={handleChange} name="description"  placeholder="Enter Description..." required />
            <select onChange={handleChange} name="topic" value={forum.topic}>
              <option value="Pure Mathematics I">Pure Maths I</option>
              <option value="Probability And Statistics">Statistics</option>
            </select>
            <button type="submit">Add Resource!</button>
          </form>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          <Link to="/forum">Check Forum!</Link>
        </>
      ) : (
        <div>
          <Link to="login">Please Login to Continue!</Link>
        </div>
      )}
    </div>
  );
};

export default CreateForum;
