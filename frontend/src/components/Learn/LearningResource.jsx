/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../App";
import Axios from "axios";
import { useHover } from "@uidotdev/usehooks";

const LearningResource = () => {
  const { loading, setLoading } = useContext(UserContext);
  const BASE =
    "http://localhost:8000/resources/topic/learned";
    const [ref, hovering] = useHover();

    let theIncrement = 0;

  async function updateProgress() {
    try {
      setLoading(true);
      const { data } = await Axios.post(BASE); //backend route must increase progress

      if (data.status === 200) {
        alert("Nice!");
      }
   
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(hovering){
        alert("Hovering!")
        theIncrement++;
        // updateProgress();
    }

    console.log(`Your value is ${theIncrement}`);
  }, [hovering,theIncrement]);

  return (
    !loading && (
      <div>
        <h1>learning Resources</h1>
        <div className="end" ref={ref}>
          <h1>The bottom part!</h1>
        </div>
        <p>{theIncrement}</p>
      </div>
    )
  );
};

export default LearningResource;
