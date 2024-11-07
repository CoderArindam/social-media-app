// utils/api.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/", // Adjust according to backend server
  withCredentials: true, // Ensure cookies are included in requests
});

export default instance;
