/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";

import Axios from "axios";
import { UserContext } from "../../App";

const Login = () => {
  const { loading, setLoading, setUser, status, setStatus } =
    useContext(UserContext);
  const [newUser, setnewUser] = useState({ username: "", password: "" });
  const [state, setState] = useState("");
  const [log, setLog] = useState(false);

  const handleChange = (e) => {
    setnewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  async function Login(e) {
    e.preventDefault();
    if (log === true) {
      alert(`${newUser.username} already logged in!`);
    } else {
      try {
        //   setLoading(true);
        const loginUser = await Axios.post(
          "http://localhost:8000/login",
          newUser
        );
        if (loginUser.status === 200) {
          setState(loginUser.data.username);

          //There's an context issue here!
          setLog(true);
          // setUser(loginUser.data);
          // setStatus(`${newUser.username} Logged in!`);

          console.log(loginUser.data);

          alert(`${newUser.username} logged in`);
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
  }

  return loading ? (
    "Loading..."
  ) : (
    <div>
      <h1>Login</h1>
      <form onSubmit={Login}>
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
        <button type="submit">Login!</button>
      </form>
      <h1>{state ? `${state} Logged in!` : ""}</h1>
    </div>
  );
};

export default Login;
