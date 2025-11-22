// src/services/eventService.js
import API from "../utils/api";

export const getEvents = async () => {
  const res = await API.get("/events");
  return res.data;
};

export const createEvent = async (data) => {
  const res = await API.post("/events", data);
  return res.data;
};

export const filterEvents = async (filters) => {
  const res = await API.post("/events/filter", filters);
  return res.data;
};
