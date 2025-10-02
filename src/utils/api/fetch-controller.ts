import { API_BASE_URL } from "@/lib/constant";
import { ResponseData } from "@/types";

export interface FetchControllerProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url?: string;
  endpoint?: string;
  headers?: Record<string, string>;
  body?: Record<string, any> | FormData;
  signal?: AbortSignal;
  credentials?: RequestCredentials;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  onFinally?: () => void;
  queryString?: string;
}

export const fetchController = async <T = any>({
  method,
  url,
  endpoint = "",
  headers = {},
  body,
  signal,
  credentials = "include",
  onSuccess,
  onError,
  onFinally,
  queryString,
}: FetchControllerProps) => {
  try {
    const fullUrl =
      url ||
      `${API_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ""}`;

    const config: RequestInit = {
      method,
      signal,
      credentials,
    };

    if (body && method !== "GET") {
      if (body instanceof FormData) {
        config.body = body;
        config.headers = headers;
      } else {
        config.body = JSON.stringify(body);
        config.headers = {
          "Content-Type": "application/json",
          ...headers,
        };
      }
    } else {
      config.headers = {
        "Content-Type": "application/json",
        ...headers,
      };
    }

    const response = await fetch(fullUrl, config);

    const contentType = response.headers.get("content-type");
    const data = (
      contentType?.includes("application/json")
        ? await response.json()
        : await response.text()
    ) as ResponseData<T>;

    onSuccess?.(data);
    return { data, status: response.status, ok: response.ok };
  } catch (error) {
    const fetchError =
      error instanceof Error ? error : new Error("Unknown error occurred");
    onError?.(fetchError);
    throw fetchError;
  } finally {
    onFinally?.();
  }
};
