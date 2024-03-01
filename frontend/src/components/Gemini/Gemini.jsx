import { useContext, useState } from "react";
import Axios from "axios";
import { UserContext } from "../../App";
import BarLoader from "react-spinners/BarLoader";
import { AiFillRobot } from "react-icons/ai";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"; 
import "./Bot.css"; 

function Gemini() {
  const { logged } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState(false);

  const endPoint = "http://localhost:8000/gemini";

  let searchCounter = 0;

  async function GatherData(e) {
    setData([]);
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.post(endPoint, search);
      if (response.status === 200) {
        searchCounter++;
      }
      setData(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return logged ? (
    <div className="bot-container">
      <AiFillRobot className="dabot" onClick={() => setMenu(prev => !prev)}>
        {menu ? "Close Bot" : "Open Bot!"}
      </AiFillRobot>
      {menu && (
        <form onSubmit={GatherData} className="askMe">
          <TextField
            className="bot-input"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Say something"
          />
          <Button type="submit" disabled={loading} className="bot-Button">
            {loading ? <BarLoader /> : <p>Search</p>}
          </Button>
          {data && data.length ? (
            data.map((x, index) => (
              <div key={x.id || index} className="bot-response">
                <p>{x.Data}</p>
              </div>
            ))
          ) : (
            <h2 className="bot-message" style={{ color: "black" }}>
              {searchCounter === 0
                ? "Hi, I'm Vexy, how may I help you today! 🤖👋🏻"
                : "Anything else?"}
            </h2>
          )}
        </form>
      )}
    </div>
  ) : (
    ""
  );
}

export default Gemini;
