import { BaseApiRequest } from "@/types";
import { fetchController } from "../fetch-controller";
import { API_ENDPOINTS } from "../endpoints";
import { UpdatePasswordPayload, UpdateProfilePayload } from '@/types/profile';

export const ProfileHandler = {
  getProfile: async ({ queryString }: BaseApiRequest) => {
    return await fetchController({
      method: "GET",
      endpoint: API_ENDPOINTS.profile.base,
      queryString,
    });
  },

  updateProfile: async ({ queryString, payload }: BaseApiRequest<UpdateProfilePayload>) => {
    return await fetchController({
      method: "PUT",
      endpoint: API_ENDPOINTS.profile.base,
      body: payload,
      queryString,
    });
  },

  updateAddress: async ({ payload, queryString }: BaseApiRequest) => {
    return await fetchController({
      method: "PUT",
      endpoint: API_ENDPOINTS.profile.address,
      body: payload,
      queryString,
    });
  },

  getOrders: async ({ queryString }: BaseApiRequest) => {
    return await fetchController({
      method: "GET",
      endpoint: API_ENDPOINTS.profile.orders,
      queryString,
    });
  },

  getReviews: async ({ queryString }: BaseApiRequest) => {
    return await fetchController({
      method: "GET",
      endpoint: API_ENDPOINTS.profile.reviews,
      queryString,
    });
  },

  updatePassword: async ({ queryString, payload }: BaseApiRequest<UpdatePasswordPayload>) => {
    return await fetchController({
      method: "PUT",
      endpoint: API_ENDPOINTS.profile.password,
      body: payload,
      queryString,
    });
  },
};
