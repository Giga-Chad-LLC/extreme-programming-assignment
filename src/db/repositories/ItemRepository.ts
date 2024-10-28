import { Item, Status } from "@prisma/client";
import { PrismaClient } from "@prisma/client";


export interface ItemRepository {
  getAll(listId: number): Promise<Item[]>
  create(listId: number, title: string, description: string): Promise<Item>
  delete(itemId: number): Promise<Item | null>
  update(itemId: number, title?: string, description?: string, status?: string): Promise<Item | null>
};

export class ItemDBRepository implements ItemRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getAll(listId: number): Promise<Item[]> {
    return this.prisma.item.findMany({ where: { listId } });
  }

  async create(listId: number, title: string, description: string): Promise<Item> {
    return this.prisma.item.create({
      data: { listId, title, description, status: Status.TODO },
    });
  }

  async delete(itemId: number): Promise<Item | null> {
    // TODO: check that items is stored in list
    const item = await this.prisma.item.findFirst({
      where: { id: itemId },
    });

    if (!item) {
      return null;
    }

    return this.prisma.item.delete({
      where: { id: itemId }
    });
  }
  
  async update(itemId: number, title?: string, description?: string, status?: Status): Promise<Item | null> {
    // TODO: check that list stores the item
    const item = await this.prisma.item.findFirst({
      where: {
        id: itemId
      },
    });

    if (!item) {
      return null;
    }
    
    const data = {
      title: title ? title : item.title,
      description: description ? description : item.description,
      status: status ? status : item.status
    }

    return this.prisma.item.update({
      where: { id: itemId },
      data,
    });
  }
}