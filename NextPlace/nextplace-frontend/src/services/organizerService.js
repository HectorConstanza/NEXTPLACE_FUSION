// src/services/organizerService.js
import API from "../utils/api";

export const loginOrganizer = async (data) => {
  const res = await API.post("/organizers/login", data);
  return res.data;
};

export const registerOrganizer = async (data) => {
  const res = await API.post("/organizers/register", data);
  return res.data;
};
