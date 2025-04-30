import api from "../axiosConfig";

const endpoint = "/cameras";

export const getAllCameras = async () => {
    try {
        const response = await api.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("Error fetching cameras:", error);
        throw error;
    }
}

export const getAllCamerasPaged = async (page, size) => {
    try {
        const response = await api.get(`${endpoint}/paged`, {
            params: { page, size },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching cameras:", error);
        throw error;
    }
}

export const getCameraById = async (cameraId) => {
    try {
        const response = await api.get(`${endpoint}/${cameraId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching camera by ID:", error);
        throw error;
    }
}

export const getCamerasByGroup = async (groupId) => {
    try {
        const response = await api.get(`${endpoint}/group/${groupId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching cameras by group:", error);
        throw error;
    }
}

export const getCameraByGroupPaged = async (groupId, page, size) => {
    try {
        const response = await api.get(`${endpoint}/by-group-paged/${groupId}`, {
            params: { page, size },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching cameras by group:", error);
        throw error;
    }
}

export const createCamera = async (cameraData) => {
    try {
        const response = await api.post(endpoint, cameraData);
        return response.data;
    } catch (error) {
        console.error("Error creating camera:", error);
        throw error;
    }
}

export const updateCamera = async (cameraId, cameraData) => {
    try {
        const response = await api.put(`${endpoint}/${cameraId}`, cameraData);
        return response.data;
    } catch (error) {
        console.error("Error updating camera:", error);
        throw error;
    }
}

export const deleteCamera = async (cameraId) => {
    try {
        const response = await api.delete(`${endpoint}/${cameraId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting camera:", error);
        throw error;
    }
}