import api from "../axiosConfig";

const endpoint = "/devices";

export const getAllDevices = async () => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching devices:", error);
    throw error;
  }
};

export const getAllDevicesPaged = async (page, size) => {
  try {
    const response = await api.get(`${endpoint}/paged`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching devices:", error);
    throw error;
  }
};

export const getDeviceById = async (deviceId) => {
  try {
    const response = await api.get(`${endpoint}/${deviceId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching device by ID:", error);
    throw error;
  }
};

export const getDevicesByGroup = async (groupId) => {
  try {
    const response = await api.get(`${endpoint}/group/${groupId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching devices by group:", error);
    throw error;
  }
};

export const createDevice = async (deviceData) => {
  console.log("Creating device with data:", deviceData);
  try {
    const response = await api.post(endpoint, deviceData);
    console.log(response.status)
    return response.data;
  } catch (error) {
    console.error("Error creating device:", error);
    throw error;
  }
};

export const updateDevice = async (deviceId, deviceData) => {
  try {
    const response = await api.put(`${endpoint}/${deviceId}`, deviceData);
    return response.data;
  } catch (error) {
    console.error("Error updating device:", error);
    throw error;
  }
};

export const deleteDevice = async (deviceId) => {
  try {
    const response = await api.delete(`${endpoint}/${deviceId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting device:", error);
    throw error;
  }
};