import Axios from "axios";

//we can use this to make life easier!

const BASE = "http://localhost:8000";

export async function EquationTest() {
  try {
    const final = await Axios.get(`${BASE}`);
    return final.data;
  } catch (err) {
    console.error(err);
  }
}

export async function NewUser(data) {
  try {
    const response = await Axios.post(`${BASE}/users`, data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function GPTSearch(search) {
  try {
    const response = await Axios.post(`${BASE}/gpts`, search);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function FetchMaterial() {
  try {
    const resources = await Axios.get(`${BASE}/resources`);
    return resources.data;
  } catch (err) {
    console.error(err);
  }
}

export async function AddMaterial(data) {
  try {
    const resources = await Axios.post("http://localhost:8000/resources", data);
    return resources.data;
  } catch (err) {
    console.error(err);
  }
}
