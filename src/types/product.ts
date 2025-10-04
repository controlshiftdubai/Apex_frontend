import { Review } from "./review";

export interface Product {
  id: string;
  slug: string;

  name: string;
  description: string;
  archived: boolean;
  sku: string;
  price: number;
  stock: number;

  thumbnail: string;
  colorHex: string;
  colorName: string;
  images: string[];
  video: string | null;
  reviews: Review[];
  currency: Currency;
  specifications?: Record<string, string> | null;

  parent_id?: string | null;

  variants: Product[];

  createdAt: Date;
  updatedAt: Date;
}

export type ProductListItem = Pick<
  Product,
  | "id"
  | "name"
  | "slug"
  | "thumbnail"
  | "price"
  | "currency"
  | "archived"
  | "stock"
  | "sku"
  | "colorName"
  | "createdAt"
  | "updatedAt"
>;

export enum Currency {
  USD = "USD",
  AED = "AED",
  EUR = "EUR",
  INR = "INR",
}
