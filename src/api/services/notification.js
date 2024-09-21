import api from "../middlewares/protected-interceptor";
import CONFIG_KEYS from "../../config";


export const getNotifications = async (endpoint, params) => {
    try {
      const response = await api.get(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, params);
      if (response) {
        const {
          statusText,
          data: { responseData: responseData },
        } = response;
        if (response?.status === 200) {
          return { data: responseData[0]?.data, metadata: responseData[0]?.metadata };
        }
      }
    } catch (error) { }
  };