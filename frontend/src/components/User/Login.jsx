/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";

import Axios from "axios";
import { UserContext } from "../../App";
import { Link ,useNavigate } from "react-router-dom";

const Login = () => {

   const navigator = useNavigate();
  const { loading, setLoading,setLog,log,setUser} =
    useContext(UserContext);
  const [newUser, setnewUser] = useState({ username: "", password: "" });
  const [state, setState] = useState("");


  const handleChange = (e) => {
    setnewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  async function Login(e) {
    e.preventDefault();
    if (log === true) {
      alert(`${newUser.username} already logged in!`);
    } else {
      try {
          setLoading(true);
        const loginUser = await Axios.post(
          "http://localhost:8000/login",
          newUser
        );
        if (loginUser.status === 200) {
          setState(loginUser.data.username);

    
          setLog(true);
          setUser(loginUser.data);
         

          console.log(loginUser.data);

          setTimeout(()=>{
            navigator('/')
          },2000)
          
        } else {
          alert("Unauthorized!");
        }
      } catch (err) {
        console.error(err);
      } finally {
          setLoading(false);
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
      <Link to="/">Go back home?</Link>
      <br></br>
      <Link to="/register">Register!</Link>
    </div>
  );
};

export default Login;
