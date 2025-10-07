import { Order } from './order';
import { Review } from './review';

export interface Profile {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  avatar?: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateProfilePayload {
  name?: string;
  phoneNumber?: string;
  avatar?: string;
}

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface ProfileOrdersResponse {
  orders: Order[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalOrders: number;
    limit: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface ProfileReviewsResponse {
  reviews: Review[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalReviews: number;
    limit: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}
