import axios from "../api/axios.js";
export const registerRequest = (usuario) =>
  axios.post(`/auth/register`, usuario);

export const loginRequest = (usuario) => axios.post(`/auth/login`, usuario);

export const verifyTokenRequest = () => axios.get("/auth/verify");

export const updateProfileRequest = (data) =>
  axios.put("/auth/perfil", data, { withCredentials: true });

export const perfilRequest = () =>
  axios.get("/auth/perfil", { withCredentials: true });

export const logoutRequest = () =>
  axios.post("/auth/logout", null, { withCredentials: true });
