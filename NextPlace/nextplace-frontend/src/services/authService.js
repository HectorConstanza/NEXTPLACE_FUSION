// src/services/authService.js
import API from "../utils/api";

export const loginUser = async (data) => {
  const res = await API.post("/users/login", data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await API.post("/users/register", data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await API.post("/users/logout");
  return res.data;
}
