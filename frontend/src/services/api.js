import axios from "axios";

const api = axios.create({
  baseURL: "https://codin-quiz-production.up.railway.app",
});

export default api;
