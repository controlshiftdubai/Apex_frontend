const PRODUCT_ENDPOINTS = () => {
  const base = "/api/products";
  return {
    base,
    single: (id: string) => `${base}/${id}`,
    getSlugs: `${base}/slugs`,
  };
};

const REVIEWS_ENDPOINTS = () => {
  const base = "/api/reviews";
  return {
    base,
    single: (id: string) => `${base}/${id}`,
    product: (productId: string) => `${base}/product/${productId}`,
  };
};

const BANNER_ENDPOINTS = () => {
  const base = "/api/banners";
  return {
    base,
    single: (id: string) => `${base}/${id}`,
    product: (bannerId: string) => `${base}/${bannerId}`,
  };
};

const AUTH_ENDPOINTS = () => {
  const base = "/auth/admin";
  return {
    base,
    signIn: `${base}/sign-in`,
    logout: `${base}/logout`,
    verify: `${base}/verify`,
  };
};

const BASKET_ENDPOINTS = () => {
  const base = "/api/baskets";
  return {
    base,
    wishlist: `${base}/wishlists`,
    cart: `${base}/carts`
  };
};

export const API_ENDPOINTS = {
  products: PRODUCT_ENDPOINTS(),
  reviews: REVIEWS_ENDPOINTS(),
  auth: AUTH_ENDPOINTS(),
  banner: BANNER_ENDPOINTS(),
  basket: BASKET_ENDPOINTS(),
};
