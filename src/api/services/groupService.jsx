import api from "../axiosConfig";

const endpoint = "/device-groups";

export const getAllGroups = async () => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching all groups:", error);
    throw error;
  }
}

export const getAllGroupsPaged = async (page, size) => {
  try {

    const response = await api.get(`${endpoint}/paged`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
}

export const getGroupById = async (groupId) => {
  try {
    const response = await api.get(`${endpoint}/${groupId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching group by ID:", error);
    throw error;
  }
};

export const authWebGroup = async (groupCredentials) => {
  try {
    const response = await api.post(`${endpoint}/auth-web, ${groupCredentials}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching group by ID:", error);
    throw error;
  }
}

export const createGroup = async (groupData) => {
  try {
    const response = await api.post(endpoint, groupData);
    return response.data;
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
};

export const updateGroup = async (groupId, groupData) => {
  try {
    const response = await api.put(`${endpoint}/${groupId}`, groupData);
    return response.data;
  } catch (error) {
    console.error("Error updating group:", error);
    throw error;
  }
};

export const updateWifiCredentials = async (groupId, wifiData) => {
  try {
    const response = await api.put(`${endpoint}/wifi/${groupId}`, wifiData);
    return response.data;
  } catch (error) {
    console.error("Error updating group WiFi credentials:", error);
    throw error;
  }
};

export const updateGroupCredentials = async (groupId, credentialsData) => {
  try {
    const response = await api.put(`${endpoint}/credentials/${groupId}`, credentialsData);
    return response.data;
  } catch (error) {
    console.error("Error updating group credentials:", error);
    throw error;
  }
};

export const deleteGroup = async (groupId) => {
  try {
    const response = await api.delete(`${endpoint}/${groupId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting group:", error);
    throw error;
  }
};

