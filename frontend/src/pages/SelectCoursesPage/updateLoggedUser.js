import Axios from "axios";

const updateLoggedUser = async (userID) => {
  const response = await Axios.post("http://localhost:8000/user/getUserById", {
    id: userID,
  });
  sessionStorage.setItem("loggedUser", JSON.stringify(response));
};

export default updateLoggedUser;
