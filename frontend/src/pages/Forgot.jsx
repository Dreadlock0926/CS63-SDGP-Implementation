/* eslint-disable no-unused-vars */
import Axios from "axios";
import { useState } from "react";

const BASE = "http://localhost:8000/login"; //need to create route

const ForgotPass = () => {
  const [data, setData] = useState({ mail: "", newPass: "" });
  //GONNA SPEND LESS TIME HERE AS ITS A LUXURY FEATURE!
  // async function forgotPassword() {
  //   try {
  //     const data = await Axios.post(`${BASE}/`);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Forgot your password?</h1>
      <form>
        <input
          onChange={handleChange}
          name="mail"
          placeholder="Enter Mail..."
          type="mail"
        ></input>
        <input
          onChange={handleChange}
          name="newPass"
          placeholder="Enter New Password..."
          type="password"
        ></input>
        <button type="submit">Submit!</button>
      </form>
    </div>
  );
};

export default ForgotPass;
