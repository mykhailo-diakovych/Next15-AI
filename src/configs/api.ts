import axios from "axios";

import { getApiUrl } from "@utils/getApiUrl";

import { getUser } from "@/app/(auth)/utils/getUser";

// Create a basic Axios instance with only baseURL configuration
export const api = axios.create({
   baseURL: getApiUrl(),
   paramsSerializer: (params) => {
      const result = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
         if (Array.isArray(value)) {
            // Serialize arrays without brackets
            value.forEach((item) => result.append(key, item));
         } else {
            result.append(key, value);
         }
      }
      return result.toString();
   },
});

// Add a request interceptor to add the functions key header to every request
api.interceptors.request.use(
   (config) => {
      // Add the x-functions-key header
      config.headers["x-functions-key"] = process.env.NEXT_PUBLIC_FUNCTIONS_KEY;

      const user = getUser();
      if (user) {
         config.headers["x-user-id"] = user.id;
         config.headers["x-session-id"] = user.sessionId;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   },
);

// Add an interceptor to check user validity on each response
api.interceptors.response.use(
   (response) => {
      return response; // Return the response if everything is fine
   },
   async (error) => {
      if (error.response?.status === 401) {
         if (typeof window !== "undefined") {
            window.location.href = "/login"; // Force redirect
            sessionStorage.removeItem("user");
         }
      }
      return Promise.reject(error); // Reject other errors normally
   },
);
