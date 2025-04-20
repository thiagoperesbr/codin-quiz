import axios from "axios";

const api = axios.create({
  baseURL: "https://codin-quiz.onrender.com",
});

export default api;
