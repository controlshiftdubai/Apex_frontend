import { fetchController } from "@/utils/api/fetch-controller";
import { BaseApiRequest, PaginatedResponse } from "@/types";
import { API_ENDPOINTS } from "@/utils/api/endpoints";
import { Banner } from "@/types/banner";

export const BannerHandler = {
  // createSingle: async ({
  //   queryString,
  //   payload,
  // }: BaseApiRequest<{ banner: Partial<Banner> }>) => {
  //   return await fetchController<Banner>({
  //     method: "POST",
  //     endpoint: API_ENDPOINTS.banner.base,
  //     queryString,
  //     body: payload.banner,
  //   });
  // },

  getAll: async ({ queryString }: BaseApiRequest) => {
    return await fetchController<PaginatedResponse<Banner>>({
      method: "GET",
      endpoint: API_ENDPOINTS.banner.base,
      queryString,
    });
  },

  getSingle: async ({
    queryString,
    payload,
  }: BaseApiRequest<{ bannerId: string }>) => {
    return await fetchController<Banner>({
      method: "GET",
      endpoint: API_ENDPOINTS.banner.single(payload!.bannerId),
      queryString,
    });
  },

  // updateSingle: async ({
  //   payload,
  // }: BaseApiRequest<{ id: string; data: Partial<Banner> }>) => {
  //   return await fetchController<Banner>({
  //     method: "PUT",
  //     endpoint: API_ENDPOINTS.banner.single(payload!.id),
  //     body: payload!.data,
  //   });
  // },

  // deleteSingle: async ({
  //   payload,
  // }: BaseApiRequest<{ id: string; force?: boolean }>) => {
  //   return await fetchController<Banner>({
  //     method: "DELETE",
  //     endpoint: API_ENDPOINTS.banner.single(payload!.id),
  //   });
  // },
};
