import api from "../middlewares/protected-interceptor";
import CONFIG_KEYS from "../../config";
export const getDrivers = async (endpoint, params) => {
  try {
    const response = await api.get(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, params);
    if (response?.data?.responseCode === 200) {
      return response?.data?.responseData[0];
    }
  } catch (error) { }
};
