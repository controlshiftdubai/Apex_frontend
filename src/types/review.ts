import { Product } from "./product";
import { User } from "./user";

export interface Review {
  id: string;
  rating: number; // 1 to 5
  title?: string;
  review?: string;

  userId: string;
  user?: User;

  productId: string;
  product?: Product;

  createdAt: Date;
  updatedAt: Date;
}

// model Review {
//   id        String  @id @default(auto()) @map("_id") @db.ObjectId
//   product   Product @relation(fields: [productId], references: [id])
//   productId String  @db.ObjectId
//   rating    Int     @default(0) // 1 to 5
//   title     String?
//   review    String?
//   userId    String? @db.ObjectId
//   user      User?   @relation(fields: [userId], references: [id])

//   @@map("product_reviews")
// }
