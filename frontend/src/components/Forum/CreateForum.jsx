import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const CreateForum = () => {
  const [forum, setForum] = useState({
    question: "",
    topic: "Pure Mathematics I",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const navigator = useNavigate();

  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedUser")).data);
  }, []);

  const handleChange = (e) => {
    setForum({ ...forum, [e.target.name]: e.target.value });
  };
  async function createQuestions(e) {
    e.preventDefault();
    try {
      const response = await Axios.post(
        "http://localhost:8000/forum/addQuestion",
        {
          question: forum.question,
          description: forum.description,
          topic: forum.topic,
          by: loggedInUser.username,
        }
      );
      if (response.status === 201) {
        setSuccessMessage("Question added successfully!");
        setForum({ question: "", topic: "Pure Mathematics I" }); // Clear the form after successful submission
        // setTimeout(() => {
        //   navigator("/forum");
        // }, 500);
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setErrorMessage("Question was already posted!");
      } else {
        setErrorMessage(
          "An error occurred while processing your request. Please try again later."
        );
      }
      console.error(err);
    } finally {
      setForum({
        question: "",
        topic: "Pure Mathematics I",
      });
    }
  }

  useEffect(() => {
    console.log(forum.topic);
  }, [forum.topic]);

  const { logged } = useContext(UserContext);

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "24px",
      marginBottom: "20px",
      textAlign: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    input: {
      marginBottom: "15px",
      padding: "10px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      outline: "none",
    },

    button: {
      padding: "10px 20px",
      fontSize: "18px",
      backgroundColor: "#4CAF50",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      outline: "none",
      marginBottom: "20px",
    },
    link: {
      fontSize: "16px",
      color: "#4CAF50",
      textDecoration: "none",
      textAlign: "center",
      display: "block",
    },
    errorMessage: {
      color: "red",
      marginBottom: "10px",
    },
    successMessage: {
      color: "green",
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.container}>
      {loggedInUser ? (
        <>
          <h1 style={styles.title}>Add Something to the forum!</h1>
          <form style={styles.form} onSubmit={createQuestions}>
            <input
              style={styles.input}
              onChange={handleChange}
              name="question"
              value={forum.question}
              placeholder="Enter Question..."
              required
            />
            <input
              style={styles.input}
              onChange={handleChange}
              name="description"
              placeholder="Enter Description..."
              required
            />
            <select
              style={{ border: "2px solid purple" }}
              onChange={handleChange}
              name="topic"
            >
              <option value="Pure Mathematics I">Pure Maths I</option>
              <option value="Probability And Statistics I">Statistics</option>
            </select>
            <br />
            <button style={styles.button} type="submit">
              Add Resource!
            </button>
          </form>
          {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
          {successMessage && (
            <p style={styles.successMessage}>{successMessage}</p>
          )}
          <Link style={styles.link} to="/forum">
            Check Forum!
          </Link>
        </>
      ) : (
        <div>
          <Link style={styles.link} to="login">
            Please Login to Continue!
          </Link>
        </div>
      )}
    </div>
  );
};

export default CreateForum;
