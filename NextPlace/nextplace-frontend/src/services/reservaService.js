// src/services/reservaService.js
import API from "../utils/api";

export const createReserva = async (data) => {
  const res = await API.post("/reservas", data);
  return res.data;
};

export const cancelarReserva = async (id) => {
  const res = await API.post(`/reservas/cancel/${id}`);
  return res.data;
};
