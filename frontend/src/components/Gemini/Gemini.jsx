import { useContext, useState } from "react";
import Axios from "axios";
import { UserContext } from "../../App";
import ScaleLoader from "react-spinners/ScaleLoader";
import "./gemini.css"; 

function Gemini() {
  const { logged } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal)
  }

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
        <button className="modalBtn" onClick={toggleModal}>
          <img style={{width:"40px", height:"40px"}} src='./images/chatbot.png' alt='chatbot-icon' />
        </button>
      </div>

      {modal && (
      <div className="modal">
        <h2>Gemini Chatbot</h2>
        <hr />
        <form onSubmit={GatherData} className="formContainer">
        <h2 className="botMessage" style={{ color: "black" }}>
              {searchCounter === 0
                ? "Hi, I'm Vexy, how may I help you today! 🤖👋🏻"
                : "Anything else?"}
            </h2>
          <input
            className="botInput"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔎 Enter your prompt here..."
          />
            {loading ? <div className="loaderContainer"><ScaleLoader color="#4a9dec" /></div> : ""}
          {data && data.length ? (
            data.map((x, index) => (
              <div key={x.id || index} className="bot-response">
                <p>{x.Data}</p>
              </div>
            ))
          ) : ( ""
          )}
        </form>
        <hr />
        <button onClick={toggleModal} className='closeModal'>Close</button>
        </div>
        )}
    </div>
  ) : (
    ""
  );
}

export default Gemini;
