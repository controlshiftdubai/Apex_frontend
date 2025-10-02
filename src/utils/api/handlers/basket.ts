import { fetchController } from "@/utils/api/fetch-controller";
import { BaseApiRequest } from "@/types";
import { Basket, BasketItem, BasketType } from "@/types/basket";
import { API_ENDPOINTS } from "@/utils/api/endpoints";

export const BasketHandler = {
  // GET - Get user's cart
  getCart: async ({ queryString }: BaseApiRequest) => {
    return await fetchController<Basket>({
      method: "GET",
      endpoint: API_ENDPOINTS.basket.cart,
      queryString,
    });
  },

  // GET - Get user's wishlist
  getWishlist: async ({ queryString }: BaseApiRequest) => {
    return await fetchController<Basket>({
      method: "GET",
      endpoint: API_ENDPOINTS.basket.wishlist,
      queryString,
    });
  },

  // POST - Add item to cart
  addToCart: async ({
    queryString,
    payload,
  }: BaseApiRequest<{
    productId: string;
    quantity: number;
  }>) => {
    return await fetchController<Basket>({
      method: "POST",
      endpoint: API_ENDPOINTS.basket.cart,
      queryString,
      body: payload,
    });
  },

  // POST - Add item to wishlist
  addToWishlist: async ({
    queryString,
    payload,
  }: BaseApiRequest<{
    productId: string;
    quantity?: number;
  }>) => {
    return await fetchController<Basket>({
      method: "POST",
      endpoint: API_ENDPOINTS.basket.wishlist,
      queryString,
      body: payload,
    });
  },

  // PUT - Update cart item quantity
  updateCart: async ({
    queryString,
    payload,
  }: BaseApiRequest<{
    itemId: string;
    quantity: number;
  }>) => {
    return await fetchController<Basket>({
      method: "PUT",
      endpoint: API_ENDPOINTS.basket.cart,
      queryString,
      body: payload,
    });
  },

  // PUT - Update wishlist item
  updateWishlist: async ({
    queryString,
    payload,
  }: BaseApiRequest<{
    itemId: string;
    quantity: number;
  }>) => {
    return await fetchController<Basket>({
      method: "PUT",
      endpoint: API_ENDPOINTS.basket.wishlist,
      queryString,
      body: payload,
    });
  },

  // DELETE - Remove item from cart
  removeFromCart: async ({
    queryString,
    payload,
  }: BaseApiRequest<{ itemId: string }>) => {
    return await fetchController<Basket>({
      method: "DELETE",
      endpoint: API_ENDPOINTS.basket.cart,
      queryString,
      body: payload,
    });
  },

  // DELETE - Remove item from wishlist
  removeFromWishlist: async ({
    queryString,
    payload,
  }: BaseApiRequest<{ itemId: string }>) => {
    return await fetchController<Basket>({
      method: "DELETE",
      endpoint: API_ENDPOINTS.basket.wishlist,
      queryString,
      body: payload,
    });
  },
};
