import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
});

export const publicApi = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const failedRequest = error.config;

    if (!(error.response?.status === 401) || failedRequest.alreadyRetried) {
        return Promise.reject(error);
    }

    failedRequest.alreadyRetried = true;

    try {
        await publicApi.post("/auth/refresh");
        return api(failedRequest);
    } catch {
        if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export { api };