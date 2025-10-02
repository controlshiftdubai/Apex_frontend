import { fetchController } from "@/utils/api/fetch-controller";
import { BaseApiRequest, PaginatedResponse } from "@/types";
import { Product, ProductListItem } from "@/types/product";
import { API_ENDPOINTS } from "@/utils/api/endpoints";

export const ProductHandler = {
  // createSingle: async ({
  //   queryString,
  //   payload,
  // }: BaseApiRequest<{ product: Partial<Product> }>) => {
  //   return await fetchController<Product>({
  //     method: "POST",
  //     endpoint: API_ENDPOINTS.products.base,
  //     queryString,
  //     body: payload.product,
  //   });
  // },

  getAll: async ({ queryString }: BaseApiRequest) => {
    return await fetchController<PaginatedResponse<ProductListItem>>({
      method: "GET",
      endpoint: API_ENDPOINTS.products.base,
      queryString,
    });
  },

  getSingle: async ({
    queryString,
    payload,
  }: BaseApiRequest<{ idOrSlug: string }>) => {
    return await fetchController<Product>({
      method: "GET",
      endpoint: API_ENDPOINTS.products.single(payload!.idOrSlug),
      queryString,
    });
  },

  getSlugs: async ({ queryString }: BaseApiRequest) => {
    return await fetchController<{ slug: string }[]>({
      method: "GET",
      endpoint: API_ENDPOINTS.products.getSlugs,
      queryString,
    });
  },

  // updateSingle: async ({
  //   payload,
  // }: BaseApiRequest<{ id: string; data: Partial<Product> }>) => {
  //   return await fetchController<Product>({
  //     method: "PUT",
  //     endpoint: API_ENDPOINTS.products.single(payload!.id),
  //     body: payload!.data,
  //   });
  // },

  // deleteSingle: async ({
  //   payload,
  // }: BaseApiRequest<{ id: string; force?: boolean }>) => {
  //   return await fetchController<Product>({
  //     method: "DELETE",
  //     endpoint: API_ENDPOINTS.products.single(payload!.id),
  //   });
  // },
};
