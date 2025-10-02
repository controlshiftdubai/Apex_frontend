"use client";

import { BasketHandler } from "../handlers/basket";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { buildQueryString } from "@/lib/utils";
import { BaseApiHookRequest } from "@/types";
import { toast } from "sonner";

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

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      const result = await BasketHandler.addToCart({
        payload: {
          items: [{ productId, quantity }]
        },
      });
      if (result.data.error) {
        throw new Error(result.data.message || "Failed to add to cart");
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["basket", "cart"] });
      toast.success("Item added to cart");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add to cart");
    },
  });
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity?: number }) => {
      const result = await BasketHandler.addToWishlist({
        payload: {
          items: [{ productId, quantity: quantity || 1 }]
        },
      });
      if (result.data.error) {
        throw new Error(result.data.message || "Failed to add to wishlist");
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["basket", "wishlist"] });
      toast.success("Item added to wishlist");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add to wishlist");
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ itemId }: { itemId: string }) => {
      const result = await BasketHandler.removeFromCart({
        payload: { productId: itemId },
      });
      if (result.data.error) {
        throw new Error(result.data.message || "Failed to remove item");
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["basket", "cart"] });
      toast.success("Item removed from cart");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to remove item");
    },
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ itemId }: { itemId: string }) => {
      const result = await BasketHandler.removeFromWishlist({
        payload: { productId: itemId },
      });
      if (result.data.error) {
        throw new Error(result.data.message || "Failed to remove item");
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["basket", "wishlist"] });
      toast.success("Item removed from wishlist");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to remove item");
    },
  });
};

export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      const result = await BasketHandler.updateCart({
        payload: {
          items: [{ productId: itemId, quantity }]
        },
      });
      if (result.data.error) {
        throw new Error(result.data.message || "Failed to update cart");
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["basket", "cart"] });
      toast.success("Cart updated");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update cart");
    },
  });
};
