export interface Basket {
  id: string;
  userId: string | null;
  type: BasketType;
  items: BasketItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BasketItem {
  id: string;
  basketId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
  currency: string;
  slug: string;
}

export enum BasketType {
  WISHLIST = "WISHLIST",
  CART = "CART"
}

// model Basket {
//   id String @id @default(auto()) @map("_id") @db.ObjectId

//   user   User?   @relation(fields: [userId], references: [id])
//   userId String? @db.ObjectId

//   type BasketType // WISHLIST or CART

//   items BasketItem[]

//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

//   @@unique([userId, type])
//   @@map("basket")
// }

// model BasketItem {
//   id       String @id @default(auto()) @map("_id") @db.ObjectId
//   basket   Basket @relation(fields: [basketId], references: [id])
//   basketId String @db.ObjectId

//   product   Product @relation(fields: [productId], references: [id])
//   productId String  @db.ObjectId

//   quantity Int @default(1)

//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

//   @@unique([basketId, productId])
//   @@map("basket_item")
// }

// enum BasketType {
//   WISHLIST
//   CART
// }