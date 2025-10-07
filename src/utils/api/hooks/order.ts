"use client";
import { OrderHandler } from "../handlers/order";
import { useMutation, useQuery } from "@tanstack/react-query";
import { buildQueryString } from "@/lib/utils";
import { BaseApiHookRequest } from "@/types";
import { CreateOrderPayload, VerifyPaymentPayload } from "@/types/order"

export const useOrders = ({ params }: BaseApiHookRequest) => {
  const queryString = buildQueryString(params);

  return useQuery({
    queryKey: ["Orders", "list", queryString],
    queryFn: async () => {
      const response = await OrderHandler.getOrders({ queryString, payload: {} });
      return response.data;
    },
  });
};

export const useOrderById = ({ payload, params }: BaseApiHookRequest<{ orderId: string }>) => {
  const queryString = buildQueryString(params);

  return useQuery({
    queryKey: ["Orders", "single", payload.orderId, queryString],
    queryFn: async () => {
      const response = await OrderHandler.getOrderById({ payload, queryString });
      return response.data;
    },
    enabled: !!payload?.orderId,
  });
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (payload: CreateOrderPayload) => {
      const response = await OrderHandler.createOrder({ payload, queryString: "" });
      return response.data;
    },
  });
};

export const useVerifyPayment = () => {
  return useMutation({
    mutationFn: async (payload: VerifyPaymentPayload) => {
      const response = await OrderHandler.verifyPayment({ payload, queryString: "" });
      return response.data;
    },
  });
};

export const useCancelOrder = () => {
  return useMutation({
    mutationFn: async (orderId: string) => {
      const response = await OrderHandler.cancelOrder({
        payload: { orderId },
        queryString: ""
      });
      return response.data;
    },
  });
};

export const useUpdateOrderStatus = () => {
  return useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const response = await OrderHandler.updateOrderStatus({
        payload: { orderId, status },
        queryString: ""
      });
      return response.data;
    },
  });
};
