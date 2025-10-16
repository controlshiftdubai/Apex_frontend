const PRODUCT_ENDPOINTS = () => {
  const base = "/api/products";
  return {
    base,
    single: (id: string) => `${base}/${id}`,
    getSlugs: `${base}/site/slugs`,
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
  const base = "/auth";
  return {
    base,
    adminSignIn: `${base}/admin/sign-in`,
    adminLogout: `${base}/admin/logout`,
    adminVerify: `${base}/admin/verify`,
    userSignIn: `${base}/sign-in`,
    userSignUp: `${base}/sign-up`,
    logout: `${base}/logout`,
    verify: `${base}/verify`,
    resendVerification: `${base}/resend-verification`,
    verifyEmail: `${base}/verify-email`,
  };
};

const BASKET_ENDPOINTS = () => {
  const base = "/api/baskets";
  return {
    base,
    wishlist: `${base}/wishlists`,
    cart: `${base}/carts`,
    move: `${base}/move`
  };
};

const PROFILE_ENDPOINTS = () => {
  const base = "/api/profile";
  return {
    base,
    orders: `${base}/orders`,
    reviews: `${base}/reviews`,
    password: `${base}/password`,
    address: `${base}/address`
  };
};

const ORDER_ENDPOINTS = () => {
  const base = "/api/orders";
  return {
    base,
    single: (orderId: string) => `${base}/${orderId}`,
    cancel: (orderId: string) => `${base}/${orderId}/cancel`,
    updateStatus: (orderId: string) => `${base}/${orderId}/status`,
    verifyPayment: `${base}/verify-payment`,
  };
};

export const API_ENDPOINTS = {
  products: PRODUCT_ENDPOINTS(),
  reviews: REVIEWS_ENDPOINTS(),
  auth: AUTH_ENDPOINTS(),
  banner: BANNER_ENDPOINTS(),
  basket: BASKET_ENDPOINTS(),
  profile: PROFILE_ENDPOINTS(),
  orders: ORDER_ENDPOINTS(),
};
