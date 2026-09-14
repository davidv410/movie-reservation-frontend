import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

export const publicApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

let refreshInProgress: Promise<void> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const failedRequest = error.config;

    if (!(error.response?.status === 401) || failedRequest.alreadyRetried) {
        return Promise.reject(error);
    }

    failedRequest.alreadyRetried = true;

    try {
      if(!refreshInProgress){
        refreshInProgress = publicApi.post("/auth/refresh").then(() => undefined).finally(() => { refreshInProgress = null })
      }
      
      await refreshInProgress;
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