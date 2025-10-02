"use client";
import { ProductHandler } from "../handlers/product";
import { useQuery } from "@tanstack/react-query";
import { buildQueryString } from "@/lib/utils";
import { BaseApiHookRequest } from "@/types";

export const useProducts = ({ params }: BaseApiHookRequest) => {
  const queryString = buildQueryString(params);

  const query = useQuery({
    queryKey: ["Products", "list", queryString],
    queryFn: async () => {
      const response = await ProductHandler.getAll({
        queryString,
        payload: {},
      });
      return response.data;
    },
  });

  return query;
};

export const useSingleProduct = ({
  payload,
  params,
}: BaseApiHookRequest<{ idOrSlug: string }>) => {
  const queryString = buildQueryString(params);

  const query = useQuery({
    queryKey: ["Products", "single", payload.idOrSlug, queryString],
    queryFn: async () => {
      const response = await ProductHandler.getSingle({ payload, queryString });
      return response.data;
    },
    enabled: !!payload?.idOrSlug,
  });

  return query;
};
