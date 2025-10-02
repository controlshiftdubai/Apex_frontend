import { BaseApiRequest, SignInRequest, UserSignUpPayload } from "@/types";
import { fetchController } from "../fetch-controller";
import { API_ENDPOINTS } from "../endpoints";
import { User } from '@/types/user';

export const AuthAPI = {
  verify: async ({ queryString }: BaseApiRequest) => {
    return await fetchController({
      method: "GET",
      endpoint: API_ENDPOINTS.auth.verify,
      queryString,
    });
  },
  adminSignIn: async ({ queryString, payload }: BaseApiRequest<SignInRequest>) => {
    return await fetchController({
      method: "POST",
      endpoint: API_ENDPOINTS.auth.adminSignIn,
      body: payload,
      queryString,
    });
  },
  userSignIn: async ({ queryString, payload }: BaseApiRequest<SignInRequest>) => {
    return await fetchController({
      method: "POST",
      endpoint: API_ENDPOINTS.auth.userSignIn,
      body: payload,
      queryString,
    });
  },
  userSignUp: async ({ queryString, payload }: BaseApiRequest<UserSignUpPayload>) => {
    return await fetchController({
      method: "POST",
      endpoint: API_ENDPOINTS.auth.userSignUp,
      body: payload,
      queryString,
    });
  },
  logout: async ({ queryString }: BaseApiRequest) => {
    return await fetchController({
      method: "POST",
      endpoint: API_ENDPOINTS.auth.logout,
      queryString,
    });
  },
};
