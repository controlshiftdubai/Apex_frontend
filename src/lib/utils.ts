import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const scrollToSection = (href: string) => {
  const section = document.getElementById(href);
  if (section) section?.scrollIntoView({ behavior: "smooth" });
};
export const buildQueryString = (params?: Record<string, string>) =>
  params ? `${new URLSearchParams(params).toString()}` : "";
