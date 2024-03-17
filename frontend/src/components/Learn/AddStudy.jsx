/* eslint-disable no-unused-vars */
import { useContext, useRef, useState } from "react";
import { AddMaterial } from "../Api/Api";
import Axios from "axios";
import { UserContext } from "../../App";
import { useNavigation,useParams } from "react-router-dom";

import Loading from "../Loading";
// import { RingLoader } from "react-spinners/RingLoader";
import "./Add.css";

const AddStudy = () => {
  const { loading, setLoading, status, setStatus, navigator } =
    useContext(UserContext);
  const BASE = "http://localhost:8000/resources";

  const [data, setData] = useState({
    topic: "Pure Mathematics I",
    title: "",
    about: "",
    subtopic: "",
    photo: null,
    url: "",
  });

  const theDrop = useRef();
  const {id} = useParams();

  const addMaterial = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      console.log(data);
      const userForm = new FormData();
      userForm.append("topic", data.topic);
      userForm.append("title", data.title);
      userForm.append("about", data.about);
      userForm.append("subtopic", data.subtopic);
      userForm.append("image", data.photo);
      userForm.append("url", data.url);
      // console.log(userForm);
      const resources = await Axios.post(BASE, data);
      // {headers: {"Content-Type": "multipart/form-data"}
      //if we need images to be sent we need to use forms , rn the form is not sending the data properly!
      //there's a problem here

      if (resources.data.status === 201) {
        setStatus("Added Resource!");
        setTimeout(() => {
          setStatus("");
        }, 2000);
        navigator("/resources");
      }
    } catch (err) {
      console.error(err);
      if (err.data && err.data.status === 409) {
        setStatus(`${data.title} Already exists!`);
      }
    } finally {
      setLoading(false);
      setData({
        topic: "Pure Mathematics I",
        title: "",
        about: "",
        subtopic: "",
        url: "",
      });
      // theDrop.current.value = "Pure Mathematics I";
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleDrop = (e) => {
    setData({ ...data, topic: e.target.value });
  };

  const handleFile = (e) => {
    setData({ ...data, [e.target.name]: e.target.file[0] });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="addQues">
          <h1>Adding Learning Resources 📚🐳</h1>
          <form onSubmit={addMaterial}>
            <select
              onChange={handleDrop}
              name="topic"
              ref={theDrop}
              value={data.topic}
            >
              <option value="Pure Mathematics I">Pure Math 1</option>
              <option value="Probability And Statistics">Statistics</option>
            </select>
            <input
              onChange={handleChange}
              name="title"
              placeholder="Enter title"
              type="text"
              required
              minLength={5}
            ></input>
            <input
              onChange={handleChange}
              name="about"
              placeholder="Enter about"
              type="text"
            ></input>
            {/* <input
              onChange={handleFile}
              type="file"
              name="photo"
            ></input> */}
            {/**UNCOMMENT IF YALL WANNA UPLOAD IMAGES LUL */}
            <input
              onChange={handleChange}
              name="subtopic"
              placeholder="Enter subtopic"
              type="text"
            ></input>
            <input
              onChange={handleChange}
              name="url"
              placeholder="Enter Link"
              type="text"
            ></input>
            <button type="submit">Add Resource</button>
          </form>
          <h1>Your id {id}</h1>
          <p>{status}</p>
        </div>
      )}
    </>
  );
};

export default AddStudy;
