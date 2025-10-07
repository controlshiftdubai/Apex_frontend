"use client";
import { ReviewHandler } from "../handlers/reviews";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { buildQueryString } from "@/lib/utils";
import { BaseApiHookRequest } from "@/types";

export const useReviews = ({ params }: BaseApiHookRequest) => {
  const queryString = buildQueryString(params);

  const query = useQuery({
    queryKey: ["reviews", "list", queryString],
    queryFn: async () => {
      const response = await ReviewHandler.getAll({
        queryString,
        payload: {},
      });
      return response.data;
    },
  });

  return query;
};

export const useSingleReview = ({
  payload,
  params,
}: BaseApiHookRequest<{ idOrSlug: string }>) => {
  const queryString = buildQueryString(params);

  const query = useQuery({
    queryKey: ["reviews", "single", payload.idOrSlug, queryString],
    queryFn: async () => {
      const response = await ReviewHandler.getSingle({ payload, queryString });
      return response.data;
    },
  });

  return query;
};

export const useReviewById = ({
  payload,
  params,
}: BaseApiHookRequest<{ productId: string }>) => {
  const queryString = buildQueryString(params);

  const query = useQuery({
    queryKey: ["reviews", "single", payload.productId, queryString],
    queryFn: async () => {
      const response = await ReviewHandler.getAllByProduct({
        payload,
        queryString,
      });
      return response.data;
    },
  });

  return query;
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      productId: string;
      orderId: string;
      rating: number;
      comment: string;
    }) => {
      const response = await ReviewHandler.createReview({
        payload,
        queryString: "",
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Profile", "reviews"] });
    },
  });
};