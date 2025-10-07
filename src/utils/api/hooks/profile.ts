"use client";
import { ProfileHandler } from "../handlers/profile";
import { useMutation, useQuery } from "@tanstack/react-query";
import { buildQueryString } from "@/lib/utils";
import { BaseApiHookRequest } from "@/types";
import { UpdateProfilePayload, UpdatePasswordPayload } from "@/types/profile"

export const useProfile = ({ params }: BaseApiHookRequest) => {
  const queryString = buildQueryString(params);

  return useQuery({
    queryKey: ["Profile", queryString],
    queryFn: async () => {
      const response = await ProfileHandler.getProfile({ queryString, payload: {} });
      return response.data;
    },
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      const response = await ProfileHandler.updateProfile({ payload, queryString: "" });
      return response.data;
    },
  });
};

export const useProfileOrders = ({ params }: BaseApiHookRequest) => {
  const queryString = buildQueryString(params);

  return useQuery({
    queryKey: ["Profile", "orders", queryString],
    queryFn: async () => {
      const response = await ProfileHandler.getOrders({ queryString, payload: {} });
      return response.data;
    },
  });
};

export const useProfileReviews = ({ params }: BaseApiHookRequest) => {
  const queryString = buildQueryString(params);

  return useQuery({
    queryKey: ["Profile", "reviews", queryString],
    queryFn: async () => {
      const response = await ProfileHandler.getReviews({ queryString, payload: {} });
      return response.data;
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async (payload: UpdatePasswordPayload) => {
      const response = await ProfileHandler.updatePassword({ payload, queryString: "" });
      return response.data;
    },
  });
};
