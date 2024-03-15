import Axios from "axios";

const updateLoggedUser = async (userID) => {
  const response = await Axios.post("http://localhost:8000/user/getUserById", {
    id: userID,
  });

  const userForStorage = { data: response.data }; // Wrap user object in data property
  sessionStorage.setItem("loggedUser", JSON.stringify(userForStorage));
};

export default updateLoggedUser;
