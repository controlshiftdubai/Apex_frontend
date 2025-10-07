import { fetchController } from "@/utils/api/fetch-controller";
import { BaseApiRequest, PaginatedResponse } from "@/types";
import { API_ENDPOINTS } from "@/utils/api/endpoints";
import { Review } from "@/types/review";

export const ReviewHandler = {
  getAll: async ({ queryString }: BaseApiRequest) => {
    return await fetchController<PaginatedResponse<Review>>({
      method: "GET",
      endpoint: API_ENDPOINTS.reviews.base,
      queryString,
    });
  },

  getSingle: async ({
    queryString,
    payload,
  }: BaseApiRequest<{ idOrSlug: string }>) => {
    return await fetchController<Review>({
      method: "GET",
      endpoint: API_ENDPOINTS.reviews.single(payload!.idOrSlug),
      queryString,
    });
  },

  getAllByProduct: async ({
    queryString,
    payload,
  }: BaseApiRequest<{ productId: string }>) => {
    return await fetchController<Review>({
      method: "GET",
      endpoint: API_ENDPOINTS.reviews.product(payload!.productId),
      queryString,
    });
  },

  createReview: async ({
    payload,
    queryString,
  }: BaseApiRequest<{
    productId: string;
    orderId: string;
    rating: number;
    comment: string;
  }>) => {
    return await fetchController<Review>({
      method: "POST",
      endpoint: API_ENDPOINTS.reviews.base,
      body: payload,
      queryString,
    });
  },

  // updateSingle: async ({
  //   payload,
  // }: BaseApiRequest<{ id: string; data: Partial<Review> }>) => {
  //   return await fetchController<Review>({
  //     method: "PUT",
  //     endpoint: API_ENDPOINTS.reviews.single(payload!.id),
  //     body: payload!.data,
  //   });
  // },

  // deleteSingle: async ({ payload }: BaseApiRequest<{ id: string }>) => {
  //   return await fetchController<Review>({
  //     method: "DELETE",
  //     endpoint: API_ENDPOINTS.reviews.single(payload!.id),
  //   });
  // },
};
