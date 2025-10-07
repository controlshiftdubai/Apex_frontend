export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED"
}

export enum PaymentMethod {
  CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
  CARD = "CARD",
  PAYPAL = "PAYPAL",
  NET_BANKING = "NET_BANKING"
}

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED"
}

export interface Order {
  id: string;
  userId: string | null;
  items: OrderItem[];
  subTotal: number;
  total: number;
  discount: number | null;
  shippingFee: number | null;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    slug: string;
    thumbnail: string;
    price: number;
    currency: string;
    images?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderPayload {
  paymentMethod: PaymentMethod;
  notes?: string;
  shippingFee?: number;
  discount?: number;
}

export interface VerifyPaymentPayload {
  orderId: string;
  transactionId: string;
}

export interface UpdateOrderStatusPayload {
  status: OrderStatus;
}

export interface OrderResponse {
  error: boolean;
  message: string;
  payload?: {
    order: Order;
    requiresPayment: boolean;
    transactionId?: string;
    paymentUrl?: string;
  };
}

export interface OrderListResponse {
  error: boolean;
  message: string;
  payload: {
    orders: Order[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalOrders: number;
      limit: number;
      hasNext: boolean;
      hasPrevious: boolean;
    };
  };
}
