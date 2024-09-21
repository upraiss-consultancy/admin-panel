import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import CONFIG_KEYS from "../../config";
import CustomApiError from "../../utils/CustomApiError";
import { useLoading } from "../../context/loadingContext";
const axiosInstance = axios.create({
  baseURL: CONFIG_KEYS.API_BASE_URL,
});

export const useAxiosInterceptor = () => {
  const { setLoading } = useLoading();
  axiosInstance.interceptors.request.use(
    (config) => {
      setLoading(true);
      return config;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    (error) => {
      if (error.response) {
        const { data, status } = error.response;
        if (status === 400) {
          throw new CustomApiError("Bad request", data);
        } else if (status === 401) {
          throw new CustomApiError("Unauthorized", data);
        } else if (status === 404) {
          throw new CustomApiError("Not Found", data);
        } else if (status === 409) {
          throw new CustomApiError("Conflict", data);
        } else {
          throw new CustomApiError(`Request failed with status ${status}`, data);
        }
      }
       else if (error.request) {
        throw new CustomApiError(`No response received`,error.request)
      }
       else {
        console.log("Error:", error.message);
      }
  
      return Promise.reject(error);
    }
  );
}

export default axiosInstance;
