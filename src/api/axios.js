import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://filadelfia-neiva-backend-bjv5kh-888cc4-165-227-180-87.traefik.me",
  withCredentials: true,
});

export default instance;
