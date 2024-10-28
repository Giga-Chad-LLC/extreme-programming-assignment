import type {List} from "@prisma/client";
import { PrismaClient } from "@prisma/client";


export class ListRepository {
   constructor(private readonly prisma: PrismaClient) {}

  async getAll(userId: number): Promise<List[]> {
    return this.prisma.list.findMany({
      where: { userId },
      include: {
        items: true // include items of each list as well
      },
    });
  }

  async create(userId: number, name: string): Promise<List> {
    return this.prisma.list.create({
      data: {
        userId,
        name,
      },
    });
  }

  async delete(userId: number, listId: number): Promise<List | null> {
    const list = await this.prisma.list.findFirst({
      where: {
        id: listId,
        userId: userId,
      },
    });

    if (!list) {
      return null;
    }

    return this.prisma.list.delete({
      where: { id: listId },
    });
  }

  async update(userId: number, listId: number, newName: string): Promise<List | null> {
    const list = await this.prisma.list.findFirst({
      where: {
        id: listId,
        userId: userId,
      },
    });

    if (!list) {
      return null;
    }

    return this.prisma.list.update({
      where: { id: listId },
      data: { name: newName },
    });
  }
}