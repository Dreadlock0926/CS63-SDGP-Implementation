/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import Axios from "axios";
import { UserContext } from "../../App";
import { Link ,useNavigate } from "react-router-dom";

const Login = () => {

 const BASE =  "http://localhost:8000/login"

   const navigator = useNavigate();
  const { loading, setLoading,setLog,log,setUser,setStatus,status} =
    useContext(UserContext);
  const [newUser, setnewUser] = useState({ username: "", password: "" });



  const handleChange = (e) => {
    setnewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  async function Login(e) {
    e.preventDefault();
    if (log === true) {
      alert(`${newUser.username} already logged in!`);
      setTimeout(()=>{
        navigator("/")
      },2000)
    } else {
      try {
          setLoading(true);
        const loginUser = await Axios.post( //connected
          BASE,
          newUser
        );
        if (loginUser.status === 200) {
          setStatus(loginUser.data.username);
          setLog(true);
          setUser(loginUser.data);
          console.log(loginUser.data);

          setTimeout(()=>{
            navigator('/')
          },1000)
          
        } else if(loginUser.status===401) {
          alert("Unauthorized!");
        }else{
          alert("Technical issue , kindly refresh and try again! 🥹")
        }
      } catch (err) {
        console.error(err);
      } finally {
          setLoading(false);
      }
    }
  }

  async function logOut(){
    try{
      const logOut = await Axios.post(BASE)
      if(logOut.status===200){
        
        setStatus("Logged out!")
      }else{
        setStatus("No user was logged in!")
      }
    }catch(err){
      console.error(err);
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
      {/* <button onClick={logOut}>Logout!</button> */} {/**Luxury feature */}
      <h1>{status ? `${status} Logged in!` : ""}</h1>
      <p>Click <Link to="/register">here</Link> to Register!</p>
    
      <br></br>
      <Link to="/">Go back home?</Link>
    </div>
  );
};

export default Login;
