import { BaseApiRequest } from "@/types";
import { fetchController } from "../fetch-controller";
import { API_ENDPOINTS } from "../endpoints";
import { CreateOrderPayload, VerifyPaymentPayload, UpdateOrderStatusPayload } from "@/types/order"

export const OrderHandler = {
  createOrder: async ({ queryString, payload }: BaseApiRequest<CreateOrderPayload>) => {
    return await fetchController({
      method: "POST",
      endpoint: API_ENDPOINTS.orders.base,
      body: payload,
      queryString,
    });
  },

  verifyPayment: async ({ queryString, payload }: BaseApiRequest<VerifyPaymentPayload>) => {
    return await fetchController({
      method: "POST",
      endpoint: API_ENDPOINTS.orders.verifyPayment,
      body: payload,
      queryString,
    });
  },

  getOrders: async ({ queryString }: BaseApiRequest) => {
    return await fetchController({
      method: "GET",
      endpoint: API_ENDPOINTS.orders.base,
      queryString,
    });
  },

  getOrderById: async ({ queryString, payload }: BaseApiRequest<{ orderId: string }>) => {
    return await fetchController({
      method: "GET",
      endpoint: API_ENDPOINTS.orders.single(payload.orderId),
      queryString,
    });
  },

  cancelOrder: async ({ queryString, payload }: BaseApiRequest<{ orderId: string }>) => {
    return await fetchController({
      method: "POST",
      endpoint: API_ENDPOINTS.orders.cancel(payload.orderId),
      queryString,
    });
  },

  updateOrderStatus: async ({ queryString, payload }: BaseApiRequest<{ orderId: string; status: string }>) => {
    return await fetchController({
      method: "PUT",
      endpoint: API_ENDPOINTS.orders.updateStatus(payload.orderId),
      body: { status: payload.status },
      queryString,
    });
  },
};
