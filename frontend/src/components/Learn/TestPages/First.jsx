import { useState } from "react";
import { useParams } from "react-router-dom";

const First = () => {
  const { lesson } = useParams();
  const [pages, setPages] = useState([]);

  let counter = 0;

  function Test(){
    if(counter===0){
        setPages([...pages, lesson]);
    console.log(JSON.stringify(pages))
    }else{
      alert("Already added!")
    }
  }

  return (
    <div>
      <p>{lesson}</p>
      <button
        onClick={Test}
      >
        Test
      </button>
    </div>
  );
};

export default First;
