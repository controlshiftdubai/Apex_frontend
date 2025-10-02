"use client";
import { ReviewHandler } from "../handlers/reviews";
import { useQuery } from "@tanstack/react-query";
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
