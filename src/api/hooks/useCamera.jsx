import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllCameras,
  getAllCamerasPaged,
  getCameraById,
  getCamerasByGroup,
  getCameraByGroupPaged,
  createCamera,
  updateCamera,
  deleteCamera,
} from "../services/camerasService";

export const useCameras = () => {
  return useQuery({
    queryKey: ["cameras"],
    queryFn: getAllCameras,
  });
};

export const useCamerasPaged = (page, size) => {
  return useQuery({
    queryKey: ["cameras", "paged", page, size],
    queryFn: () => getAllCamerasPaged(page, size),
    keepPreviousData: true,
  });
};

export const useCameraById = (cameraId) => {
  return useQuery({
    queryKey: ["camera", cameraId],
    queryFn: () => getCameraById(cameraId),
    enabled: !!cameraId,
  });
};

export const useCamerasByGroup = (groupId) => {
  return useQuery({
    queryKey: ["cameras", "group", groupId],
    queryFn: () => getCamerasByGroup(groupId),
    enabled: !!groupId,
  });
};

export const useCamerasByGroupPaged = (groupId, page, size) => {
  return useQuery({
    queryKey: ["cameras", "group", groupId, page, size],
    queryFn: () => getCameraByGroupPaged(groupId, page, size),
    enabled: !!groupId,
    keepPreviousData: true,
  });
};

export const useCreateCamera = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCamera,
    onSuccess: () => {
      queryClient.invalidateQueries(["cameras"]);
    },
  });
};

export const useUpdateCamera = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ cameraId, cameraData }) =>
      updateCamera(cameraId, cameraData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["camera", variables.cameraId]);
      queryClient.invalidateQueries(["cameras"]);
    },
  });
};

export const useDeleteCamera = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCamera,
    onSuccess: () => {
      queryClient.invalidateQueries(["cameras"]);
    },
  });
};
