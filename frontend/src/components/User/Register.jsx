/* eslint-disable no-unused-vars */
import Axios from "axios";
import { UserContext } from "../../App";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const { loading, setLoading, setLog, setUser } = useContext(UserContext);
  const [newUser, setnewUser] = useState({ username: "", password: "" });
  const [state, setState] = useState("");

  const handleChange = (e) => {
    setnewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  async function Register(e) {
    e.preventDefault();
    try {
      //   setLoading(true);
      const loginUser = await Axios.post(
        "http://localhost:8000/register",
        newUser
      );
      if (loginUser.status === 200) {
        setState(loginUser.data.username);

        //There's an context issue here!
        // setLog(true);
        // setUser(loginUser.data);
        // setStatus(`${newUser.username} Logged in!`);

        console.log(loginUser.data);

        alert(`${newUser.username} Registered!`);
        // setTimeout(() => {
        //   navigator("/");
        // }, 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      //   setLoading(false);
    }
  }

  return loading ? (
    "Loading..."
  ) : (
    <div>
      <h1>Register</h1>
      <form onSubmit={Register}>
        <input
          onChange={handleChange}
          name="username"
          placeholder="Enter username..."
          type="text"
        ></input>
        <input
          onChange={handleChange}
          name="password"
          placeholder="Enter password..."
          type="password"
        ></input>
        <button type="submit">Register...</button>
      </form>
      <h1>{state ? `${state} Registered!` : ""}</h1>
      <Link to="/login">Login!</Link>
      <br></br>
      <Link to="/">Go back home?</Link>
    </div>
  );
};

export default Register;
