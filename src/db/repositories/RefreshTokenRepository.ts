import {IRepository} from "./IRepository";
import {PrismaClient, RefreshToken} from "@prisma/client";


export class RefreshTokenRepository implements IRepository<RefreshToken> {
   constructor(private readonly prisma: PrismaClient) {}

   async get(userId: number, token: string): Promise<RefreshToken | null> {
      return this.prisma.refreshToken.findFirst({
         where: { userId, token }
      });
   }

   async delete(userId: number, token: string): Promise<RefreshToken | null> {
      return this.prisma.refreshToken.delete({
         where: { userId, token }
      });
   }

   async create(userId: number, token: string): Promise<RefreshToken> {
      return this.prisma.refreshToken.create({
         data: {
            userId: userId,
            token: token,
         }
      });
   }

   async count(userId: number): Promise<number> {
      return this.prisma.refreshToken.count({
         where: { userId: userId }
      });
   }

   async deleteAllByUserId(userId: number): Promise<number> {
      const { count } = await this.prisma.refreshToken.deleteMany({
         where: { userId: userId }
      });
      return count;
   }
}