import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as groupService from "../services/groupService";

export const useGetAllGroups = () => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: groupService.getAllGroups,
  });
}

export const useGetAllGroupsPaged = (page, size) => {
  return useQuery({
    queryKey: ["groups", page, size],
    queryFn: () => groupService.getAllGroupsPaged(page, size),
  });
}

export const useGetGroupById = (groupId) => {
  return useQuery({
    queryKey: ["groups", groupId],
    queryFn: () => groupService.getGroupById(groupId),
  });
};

export const useAuthWebGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (group) => groupService.authWebGroup(group),
    onSuccess: () => {
      queryClient.invalidateQueries(["groups"]);
    },
  });
};

export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: groupService.createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries(["groups"]);
    },
  });
};

export const useUpdateGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: groupService.updateGroup,
    onSuccess: () => {
      queryClient.invalidateQueries(["groups"]);
    },
  });
};

export const useUpdateWifiGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: groupService.updateWifiCredentials,
    onSuccess: () => {
      queryClient.invalidateQueries(["groups"]);
    },
  });
};

export const useUpdateGroupCredentials = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: groupService.updateGroupCredentials,
    onSuccess: () => {
      queryClient.invalidateQueries(["groups"]);
    },
  });
}

export const useDeleteGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: groupService.deleteGroup,
    onSuccess: () => {
      queryClient.invalidateQueries(["groups"]);
    },
  });
};