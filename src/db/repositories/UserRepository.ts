import type {User} from "@prisma/client";
import { PrismaClient } from "@prisma/client";


export class UserRepository {
   constructor(private readonly prisma: PrismaClient) {}

   async create(email: string): Promise<User> {
      const user = await this.prisma.user.create({
         data: {
            email: email,
            name: "John Doe",
         },
      });
      console.log("User created:", user);

      return user;
   }

   async getAll(): Promise<User[]> {
      const users = await this.prisma.user.findMany();
      console.log("Users:", users);

      return users;
   }
}