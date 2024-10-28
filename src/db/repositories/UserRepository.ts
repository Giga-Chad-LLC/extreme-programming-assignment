import type {User} from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import {aw} from "vitest/dist/chunks/reporters.C4ZHgdxQ";
import {IRepository} from "./IRepository";


export class UserRepository implements IRepository<User> {
   constructor(private readonly prisma: PrismaClient) {}

   async create(email: string, password: string): Promise<User> {
      return this.prisma.user.create({
         data: {
            email,
            password,
         },
      });
   }

   async getById(userId: number): Promise<User | null> {
      return this.prisma.user.findUnique({
         where: {
            id: userId,
         },
      });
   }

   async getByEmail(email: string): Promise<User | null> {
      return this.prisma.user.findUnique({
         where: {
            email: email,
         },
      });
   }

   async getAll(): Promise<User[]> {
      return this.prisma.user.findMany();
   }
}