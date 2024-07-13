import CONFIG_KEYS from "../../config";
import api from "../middlewares/protected-interceptor";
export const createCoAdmin = async (endpoint, adminData) => {
    const response = await api.post(
      `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
      adminData
    );
    return response;
  };