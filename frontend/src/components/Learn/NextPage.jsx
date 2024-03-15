/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link, useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { useHover } from "@uidotdev/usehooks";

const NextPage = () => {
  const { id } = useParams();
  const [ref, hovering] = useHover();
  const navigator = useNavigate();
  const [material, setMaterial] = useState([]);
  const {
    BASE,
    theProgressVal,
    specificTopic,
    status,
    setStatus,
    setLessons,
    setLoading,
    setTheProgressVal,
    user,
  } = useContext(UserContext);

  useEffect(() => {
    console.log(specificTopic);
  }, [specificTopic]);

  async function getTheLesson() {
    try {
      const response = await Axios.post(
        `${BASE}/resources/search/${parseInt(id)}`,
        {
          specificTopic,
        }
      );
      console.log(response.data);
      // if (response.data.status === 200) {
      //   setMaterial(response.data);
      // }
      setMaterial(response.data);
      console.log(`The topic is ${specificTopic}`);
    } catch (err) {
      if (err.data.status === 404) { //this needs to be done properly
        alert(`Congrats you have completed ${specificTopic}!`);
        navigator("/resources");
      }
      console.error(err.data.status);
    } finally {
      console.log(material);
    }
  }

  useEffect(() => {
    getTheLesson();
  }, [id]);

  let theProgressGiven = 0;
  async function getNumberOfLessonForProgress() {
    try {
      setLoading(true);
      const { data } = await Axios.get(BASE, { userId: user.id });
      if (data.status === 200) {
        setLessons(data);
        if (theProgressVal !== "") {
          setTheProgressVal("");
        }
        theProgressGiven = data.topics.length / 100;
        console.log(theProgressGiven);
        setTheProgressVal(theProgressGiven);
      }
    } catch (err) {
      console.error(err);
      if (err.data.status === 404) {
        setStatus("No results found!");
      } else {
        setStatus("Error while processing data!");
      }
    } finally {
      setLoading(false);
    }
  }

  async function IncrementProgress() {
    try {
      const outcome = await Axios.put(`${BASE}/resources/progress/updates`, {
        progress: theProgressVal,
        userId: "65f0d2e556224d60ec899964", //user.id
      });
      if (outcome.data.status === 200) {
        alert("Incremented!");
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getNumberOfLessonForProgress();
  }, []);

  useEffect(() => {
    if (hovering) {
      alert("Hovering");
      setTheProgressVal((prev) => (prev += theProgressGiven));
      IncrementProgress();
    }
  }, [hovering]);

  return material ? (
    <div>
      <h1>{specificTopic}</h1>
      <div>
        {material && material.length
          ? JSON.stringify(material)
          : "No results found!"}
      </div>
      <Link to={`/nextpage/${Number(id) + 1}`} onClick={IncrementProgress}>
        Next Page!
      </Link>
      {/* <div className="abovend" ref={ref}>The End</div>
      <br />
      <div className="ending">The End</div> */}
    </div>
  ) : (
    <h1>You have reached the end of the course , congrats 🥳</h1>
  );
};

export default NextPage;
