"use client";
import { BannerHandler } from "../handlers/banner";
import { useQuery } from "@tanstack/react-query";
import { buildQueryString } from "@/lib/utils";
import { BaseApiHookRequest } from "@/types";

export const useBanners = ({ params }: BaseApiHookRequest) => {
  const queryString = buildQueryString(params);

  const query = useQuery({
    queryKey: ["banners", "list", queryString],
    queryFn: async () => {
      const response = await BannerHandler.getAll({
        queryString,
        payload: {},
      });
      return response.data;
    },
  });

  return query;
};

export const useSingleBanner = ({
  payload,
  params,
}: BaseApiHookRequest<{ bannerId: string }>) => {
  const queryString = buildQueryString(params);

  const query = useQuery({
    queryKey: ["banners", "single", payload.bannerId, queryString],
    queryFn: async () => {
      const response = await BannerHandler.getSingle({ payload, queryString });
      return response.data;
    },
  });

  return query;
};
