// src/services/bibliotecaService.js
import api from "./api";

export const salvarBiblioteca = async (dto) => {
  const response = await api.post("/Recomendacao/Salvar-Biblioteca", dto);
  return response.data;
};

export const removerBiblioteca = async (dto) => {
  const response = await api.post("/Recomendacao/Remover-Biblioteca", dto);
  return response.data;
};
