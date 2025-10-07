"use client";
import { AuthHandler } from "../handlers/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { buildQueryString } from "@/lib/utils";
import { BaseApiHookRequest, SignInRequest, UserSignUpPayload } from "@/types";
import { ResendVerificationPayload, VerifyEmailPayload } from "@/types/auth"

export const useUserSignIn = () => {
  return useMutation({
    mutationFn: async (payload: SignInRequest) => {
      const response = await AuthHandler.userSignIn({ payload, queryString: "" });
      return response.data;
    },
  });
};

export const useUserSignUp = () => {
  return useMutation({
    mutationFn: async (payload: UserSignUpPayload) => {
      const response = await AuthHandler.userSignUp({ payload, queryString: "" });
      return response.data;
    },
  });
};

export const useResendVerification = () => {
  return useMutation({
    mutationFn: async (payload: ResendVerificationPayload) => {
      const response = await AuthHandler.resendVerification({ payload, queryString: "" });
      return response.data;
    },
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: async (payload: VerifyEmailPayload) => {
      const response = await AuthHandler.verifyEmail({ payload, queryString: "" });
      return response.data;
    },
  });
};

export const useVerifyAuth = ({ params }: BaseApiHookRequest) => {
  const queryString = buildQueryString(params);

  return useQuery({
    queryKey: ["Auth", "verify", queryString],
    queryFn: async () => {
      const response = await AuthHandler.verify({ queryString, payload: {} });
      return response.data;
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await AuthHandler.logout({ queryString: "", payload: {} });
      return response.data;
    },
  });
};
