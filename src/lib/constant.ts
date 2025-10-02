export const IS_PRODUCTION = process.env.NODE_ENV === "production";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
