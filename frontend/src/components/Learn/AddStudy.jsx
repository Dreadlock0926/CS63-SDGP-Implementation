import { useContext, useState } from "react";
import { AddMaterial } from "../Api/Api";
import Axios from "axios";
import { UserContext } from "../../App";
import { RingLoader } from "react-spinners/RingLoader";
import "./Add.css";

const AddStudy = () => {
  const { loading, setLoading, status, setStatus } = useContext(UserContext);
  const [data, setData] = useState({
    topic: "Pure Mathematics I",
    title: "",
    about: "",
    subtopic: "",
  });

  const addMaterial = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
    
    const resources = await Axios.post("http://localhost:8000/resources", {data});
   
      if (resources.status === 201) {
        setStatus("Added Resource!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleDrop = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      {loading ? (
        <RingLoader />
      ) : (
        <div className="addQues">
          <h1>Adding Learning Resources 📚🐳</h1>
          <form onSubmit={addMaterial}>
            <select onChange={handleDrop} name="topic">
              <option value="Pure Mathematics I">Pure Math 1</option>
              <option value="Probability And Statistics">Statistics</option>
            </select>
            <input
              onChange={handleChange}
              name="title"
              placeholder="Enter title"
              type="text"
            ></input>
            <input
              onChange={handleChange}
              name="about"
              placeholder="Enter about"
              type="text"
            ></input>

            <input
              onChange={handleChange}
              name="subtopic"
              placeholder="Enter subtopic"
              type="text"
            ></input>
            <button type="submit">Add Resource</button>
          </form>
          <p>{status}</p>
        </div>
      )}
    </>
  );
};

export default AddStudy;
