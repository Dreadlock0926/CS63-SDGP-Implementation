/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const NextPage = () => {
  const { id } = useParams();
  const [material, setMaterial] = useState([]);
  const { BASE, theProgressVal, specificTopic,status,setStatus } = useContext(UserContext);

  async function getTheLesson() {
    try {
      const response = await Axios.post(`${BASE}/resources/search/${id}`, {
        specificTopic,
      });
      if (response.data.status === 200) {
        setMaterial(response.data);
      }
      console.log(`The topic is ${specificTopic}`)
    } catch (err) {
      // if(err.response.status===404){
      //   alert("End of lesson!")
      // }
      console.error(err);
    } finally {
      console.log(material);
    }
  }

  useEffect(() => {
    getTheLesson();
  }, [id]);

  async function IncrementProgress() {
    try {
      const outcome = await Axios.put(`${BASE}/resources/progress/updates`, {
        progress: theProgressVal, //global state which has the dynamic progress assigned to it
        userId: "65f2a146a0acea296a663650", //user.id
      });
      if (outcome.data.status === 200) {
        alert("Incremented!");
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div>
      <h1>The Next Page!</h1>
      <div>
        {material && material.length
          ? JSON.stringify(material)
          : "No results found!"}
      </div>
      <Link to={`/nextpage/${Number(id) + 1}`} onClick={IncrementProgress}>
        Next Page!
      </Link>
      <br />
    </div>
  );
};

export default NextPage;
