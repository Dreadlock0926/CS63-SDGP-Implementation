/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { AddMaterial } from "../Api/Api";
import { UserContext } from "../../App";

const AddStudy = () => {
  const { loading, setLoading, status, setStatus } = useContext(UserContext);
  const [data, setData] = useState({
    topic: "",
    title: "",
    about: "",
    subtopic: "",
  });

  const addMaterial = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const resources = await AddMaterial(data);
      if (resources.status === 201) {
        setStatus("Added Resource!");
      } else {
        setStatus("Error while adding resource!");
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

  //   const handleDrop = (e) => {
  //     setData({ ...data, [e.target.name]: e.target.value });
  //   };

  return (
    loading?"Loading..." :
    <div className="addQues">
      <form onSubmit={addMaterial}>
        <input
          onChange={handleChange}
          name="topic"
          placeholder="Enter topic"
          type="text"
        ></input>
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
        <select>
          {/**Preferably use drop for topics! */}
          <option value="test" onChange={handleChange}>
            Test!
          </option>
          <option value="second" onChange={handleChange}>
            Second!
          </option>
        </select>
        <input
          onChange={handleChange}
          name="subtopic"
          placeholder="Enter subtopic"
          type="text"
        ></input>
        <button>Add Resource</button>
      </form>
    </div>
  );
};

export default AddStudy;
