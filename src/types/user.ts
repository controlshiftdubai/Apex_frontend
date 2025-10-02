export interface User {
  id: string;
  email: string;
  phoneNumber: string;
  name: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// model User {
//   id String @id @default(auto()) @map("_id") @db.ObjectId

//   email       String @unique
//   phoneNumber String @unique
//   name        String

//   passwordHash String
//   verified     Boolean @default(false)

//   baskets Basket[]
//   orders  Order[]

//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//   Reviews   Review[]

//   @@unique([email, phoneNumber])
//   @@map("user")
// }
