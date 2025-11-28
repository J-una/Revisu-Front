import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:44348/api",   // coloque sua URL correta
});

export default api;