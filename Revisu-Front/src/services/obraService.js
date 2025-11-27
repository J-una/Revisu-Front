// src/services/obraService.js
import api from "./api";

export const getObraById = async (id) => {
  const response = await api.get(`/Recomendacao/detalhes-obras/${id}`);
  return response.data;
};
