import api from "../middlewares/protected-interceptor";
import CONFIG_KEYS from "../../config";
export const getProfile = async (endpoint, params) => {
  try {
    const response = await api.get(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, params);
    if (response?.data?.responseCode === 200) {
      return response?.data?.responseData[0];
    }
  } catch (error) { }
};


export const updateProfile = async (endpoint, data) => {
  try {
    const response = await api.post(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, data);
    if (response) {
      return response?.data;
    }
  } catch (error) { }
};

export const deleteProfile = async (endpoint, data) => {
  try {
    const response = await api.delete(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, data);
    if (response) {
      return response?.data;
    }
  } catch (error) { }
};


