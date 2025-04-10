import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as deviceService from "../services/deviceService";

export const useGetAllDevices = () => {
  return useQuery({
    queryKey: ["devices"],
    queryFn: deviceService.getAllDevices,
  });
};

export const useGetAllDevicesPaged = (page, size) => {
  return useQuery({
    queryKey: ["devices", page, size],
    queryFn: () => deviceService.getAllDevicesPaged(page, size),
  });
};

export const useGetDeviceById = (deviceId) => {
  return useQuery({
    queryKey: ["devices", deviceId],
    queryFn: () => deviceService.getDeviceById(deviceId),
  });
};

export const useGetDevicesByGroup = (groupId) => {
  return useQuery({
    queryKey: ["devices", groupId],
    queryFn: () => deviceService.getDevicesByGroup(groupId),
  });
};

export const useCreateDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deviceService.createDevice,
    onSuccess: () => {
      queryClient.invalidateQueries(["devices"]);
    },
  });
};

export const useUpdateDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deviceService.updateDevice,
    onSuccess: () => {
      queryClient.invalidateQueries(["devices"]);
    },
  });
};

export const useDeleteDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deviceService.deleteDevice,
    onSuccess: () => {
      queryClient.invalidateQueries(["devices"]);
    },
  });
};