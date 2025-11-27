import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7290/api",   // coloque sua URL correta
});

export default api;