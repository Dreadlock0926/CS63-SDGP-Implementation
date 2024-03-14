import { useContext, useState } from "react";
import Axios from "axios";
import { UserContext } from "../../App";
import BarLoader from "react-spinners/BarLoader";
import "./gemini.css"; 

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
    <div className="botContainer">
      <div className="botBtn">
        <button className="modalBtn" onClick={() => setMenu(prev => !prev)}>
          <img style={{width:"40px", height:"40px"}} src='./images/chatbot.png' alt='chatbot-icon' />
        </button>
      </div>

      {menu && (
        <form onSubmit={GatherData} className="formContainer">
          <input
            className="botInput"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter your prompt here..."
          />
          <button type="submit" disabled={loading} className="searchButton">
            <img style={{width:"40px", height:"40px"}} src='./images/search.png' alt='chatbot-icon' />
            {loading ? <BarLoader color="#4a9dec" /> : ""}
          </button>
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
