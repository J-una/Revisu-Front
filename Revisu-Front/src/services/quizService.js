// src/services/quizService.js
import api from "./api";

export const getQuizFilmes = async () => {
  const response = await api.get("/Recomendacao/filmes-quiz");
  return response.data;
};

export const getQuizSeries = async () => {
  const response = await api.get("/Recomendacao/series-quiz");
  return response.data;
};

export const salvarQuiz = async (dto) => {
  const response = await api.post("/Recomendacao/salvar-quiz", dto);
  return response.data;
};
