import Axios from "axios";

const updateLoggedUser = async (userID) => {
  const response = await Axios.post("http://localhost:8000/user/getUserById", {
    id: userID,
  });

  return response.data;
};

export default updateLoggedUser;
