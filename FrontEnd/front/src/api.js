// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://gestion-de-recettes-1.onrender.com/api",
});

// Ajouter automatiquement le token à chaque requête si connecté
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
