import CONFIG_KEYS from "../../config";
import authInstanceAxios from "../middlewares/interceptor";
import api from "../middlewares/protected-interceptor";

export const UserLogin = async (endpoint, adminLoginInfo) => {
  const response = await authInstanceAxios.post(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
    adminLoginInfo
  );
  return response;
};



export const adminLogout = async (endpoint) => {
  const response = await api.post(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`
  );
  return response;
};
