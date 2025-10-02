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
  createdAt: Date;
  updatedAt: Date;
}

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

// model Order {
//   id     String  @id @default(auto()) @map("_id") @db.ObjectId
//   User   User?   @relation(fields: [userId], references: [id])
//   userId String? @db.ObjectId

//   items OrderItem[]

//   subTotal    Float
//   total       Float
//   discount    Float? @default(0)
//   shippingFee Float? @default(0)

//   status        OrderStatus   @default(PENDING)
//   paymentMethod PaymentMethod
//   paymentStatus PaymentStatus @default(PENDING)
//   notes         String?

//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

//   @@map("order")
// }

// model OrderItem {
//   id      String @id @default(auto()) @map("_id") @db.ObjectId
//   order   Order  @relation(fields: [orderId], references: [id])
//   orderId String @db.ObjectId

//   product   Product @relation(fields: [productId], references: [id])
//   productId String  @db.ObjectId

//   quantity Int   @default(1)
//   price    Float

//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

//   @@map("order_item")
// }

// enum OrderStatus {
//   PENDING
//   PROCESSING
//   SHIPPED
//   DELIVERED
//   CANCELLED
//   FAILED
// }

// enum PaymentMethod {
//   CASH_ON_DELIVERY
//   CARD
//   PAYPAL
//   NET_BANKING
// }

// enum PaymentStatus {
//   PENDING
//   COMPLETED
//   FAILED
//   REFUNDED
// }
