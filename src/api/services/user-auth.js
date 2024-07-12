import CONFIG_KEYS from "../../config";
import authInstanceAxios from "../middlewares/interceptor";

export const UserLogin = async (endpoint, adminLoginInfo) => {
  const response = await authInstanceAxios.post(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
    adminLoginInfo
  );
  return response;
};

export const adminRegister = async (endpoint, adminData) => {
  const response = await authInstanceAxios.post(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
    adminData
  );
  return response;
};

export const adminLogout = async (endpoint) => {
  const response = await authInstanceAxios.post(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`
  );
  return response;
};
