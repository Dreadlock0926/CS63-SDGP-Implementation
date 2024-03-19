import { useParams } from "react-router-dom";

const SpecificCourse = () => {
  const { theTopic } = useParams(); //the topic is the param

  return (
    <div>
      <h1>Specific Course</h1>
      <p>{theTopic}</p>
    </div>
  );
};

export default SpecificCourse;
