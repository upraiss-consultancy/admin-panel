import CONFIG_KEYS from "../../config";
import api from "../middlewares/protected-interceptor";

export const createPackage = async (
    endpoint,
    packageInfo
) => {
    const response = await api.post(
        `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
        packageInfo
    );
    return response;
};

export const getPackages = async (
    endpoint,
    body
) => {
    const response = await api.post(
        `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
        body
    );
    return response;
};

export const getAllPackageList = async (
    endpoint,
    params
) => {
    const response = await api.post(
        `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
        params
    );
    return response;
};

export const deletePackage = async (
    endpoint,
    body
) => {
    const response = await api.delete(
        `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
        body
    );
    return response;
};