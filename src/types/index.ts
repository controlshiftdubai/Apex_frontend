export interface SignInRequest {
  email: string;
  password: string;
}

export type PaginatedResponse<T> = {
  total: number;
  totalPages: number;
  pageSize: number;
  page: number;
  next: number | null;
  previous: number | null;
  results: T[];
};

export type ResponseData<T> = {
  error: boolean;
  message: string;
  payload: T;
};

export interface BaseApiHookRequest<T = {}> {
  params?: Record<string, string>;
  payload: T;
}

export interface BaseApiRequest<T = {}> {
  queryString?: string;
  payload: T;
}

export interface S3UploadResponse {
  error: boolean;
  message: string;
  payload: {
    url: string;
    key: string;
    full_url: string;
  };
}
