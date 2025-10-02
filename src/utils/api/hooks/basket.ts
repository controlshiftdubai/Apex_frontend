"use client";
import { BasketHandler } from "../handlers/basket";
import { useQuery } from "@tanstack/react-query";
import { buildQueryString } from "@/lib/utils";
import { BaseApiHookRequest } from "@/types";

export const useCart = ({ params }: BaseApiHookRequest) => {
  const queryString = buildQueryString(params);

  const query = useQuery({
    queryKey: ["basket", "cart", queryString],
    queryFn: async () => {
      const response = await BasketHandler.getCart({
        queryString,
        payload: {},
      });
      return response.data;
    },
  });

  return query;
};

export const useWishlist = ({ params }: BaseApiHookRequest) => {
  const queryString = buildQueryString(params);

  const query = useQuery({
    queryKey: ["basket", "wishlist", queryString],
    queryFn: async () => {
      const response = await BasketHandler.getWishlist({
        queryString,
        payload: {},
      });
      return response.data;
    },
  });

  return query;
};