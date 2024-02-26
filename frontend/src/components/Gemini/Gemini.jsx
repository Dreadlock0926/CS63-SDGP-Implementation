import { useContext, useState } from "react";
import Axios from "axios";
import { UserContext } from "../../App";
import BarLoader from "react-spinners/BarLoader"

function Gemini() {
  const {logged} = useContext(UserContext)
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

  return logged? (
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
              {loading ? <BarLoader></BarLoader> : <p>Search</p>}
            </button>
            {data && data.length ? (
              data.map((x,index)=>(
                <div key={x.id || index}><p>{x.Data}</p></div> //we will have to double check and verify this!
              ))
            ) : (
              <h2 style={{color:"white"}}>
                {searchCounter === 0
                  ? "Hi, i'm Vexy , how may I help you today! 🤖👋🏻"
                  : "Anything else?"}
              </h2>
            )}
          </form>
        ) : (
          ""
        )}
      </div>
    </>
  ) : " ";
}

export default Gemini;
