import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? "/api/proxy"
      : import.meta.env.VITE_BASE_URL || "/api/proxy",
});

export default api;
