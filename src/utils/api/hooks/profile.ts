"use client";
import { ProfileHandler } from "../handlers/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BaseApiHookRequest } from "@/types";
import { UpdateProfilePayload, UpdatePasswordPayload } from "@/types/profile"

export const useProfile = ({ params }: BaseApiHookRequest = { params: {}, payload: {} }) => {
  return useQuery({
    queryKey: ["Profile"],
    queryFn: async () => {
      const response = await ProfileHandler.getProfile({
        queryString: "",
        payload: {},
      });
      return response.data;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      const response = await ProfileHandler.updateProfile({
        payload,
        queryString: "",
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Profile"] });
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async (payload: UpdatePasswordPayload) => {
      const response = await ProfileHandler.updatePassword({
        payload,
        queryString: "",
      });
      return response.data;
    },
  });
};

export const useProfileOrders = ({ params }: BaseApiHookRequest = { params: {}, payload: {} }) => {
  return useQuery({
    queryKey: ["Profile", "orders", params],
    queryFn: async () => {
      const queryString = new URLSearchParams(params as any).toString();
      const response = await ProfileHandler.getOrders({
        queryString,
        payload: {},
      });
      return response.data;
    },
  });
};

export const useProfileReviews = ({ params }: BaseApiHookRequest = { params: {}, payload: {} }) => {
  return useQuery({
    queryKey: ["Profile", "reviews", params],
    queryFn: async () => {
      const queryString = new URLSearchParams(params as any).toString();
      const response = await ProfileHandler.getReviews({
        queryString,
        payload: {},
      });
      return response.data;
    },
  });
};
