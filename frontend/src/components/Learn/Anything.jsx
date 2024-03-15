/* eslint-disable no-unused-vars */
import { Axios } from "axios";
import { useContext } from "react";
import { UserContext } from "../../App";

const Anything = () => {

    const {BASE} = useContext(UserContext)
    async function DoneLesson(){
        try{
            const request = await Axios.post(`${BASE}/`)
        }catch(err){
            console.error(err);
        }
    }






  return (
    <div>
      <h1>Integration by parts</h1>
      <button>Done!</button>
    </div>
  );
};

export default Anything;
