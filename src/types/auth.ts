
export interface ResendVerificationPayload {
  email: string;
}

export interface VerifyEmailPayload {
  email: string;
  code: string;
}

export interface AuthResponse {
  error: boolean;
  message: string;
  payload?: {
    user?: User;
    admin?: Admin;
    accessToken?: string;
    refreshToken?: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  avatar?: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Admin {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
