import API from "../utils/api";

export const loginUser = async (data) => {
  const res = await API.post("/api/users/login", data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await API.post("/api/users/register", data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await API.post("/api/users/logout");
  return res.data;
};

export const forgotPassword = async (email) => {
  const res = await API.post("/api/auth/forgot-password", { email });
  return res.data;
};

export const resetPassword = async (payload) => {
  const res = await API.post("/api/auth/reset-password", payload);
  return res.data;
};
