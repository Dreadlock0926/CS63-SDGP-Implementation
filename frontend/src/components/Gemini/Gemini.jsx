import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import Axios from "axios";

function Gemini() {
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

  return (
    <>
      <div style={{ float: "right", margin: "5%" }}>
        <button
          onClick={() => {
            setMenu((prev) => !prev);
          }}
        >
          {menu ? "Close Bot" : "Open Bot!"}
        </button>
        {menu ? (
          <form onSubmit={GatherData}>
            <input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Say something"
            />
            <button type="submit" disabled={loading}>
              {loading ? <TailSpin></TailSpin> : <p>Search</p>}
            </button>
            {data && data.length ? (
              JSON.stringify(data)
            ) : (
              <h2>
                {searchCounter === 0
                  ? "Hi, i'm Vexy , how may I help you today! 🤖👋🏻"
                  : "Unfortunately , I'm unable to assist you with that!☹️"}
              </h2>
            )}
          </form>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Gemini;
