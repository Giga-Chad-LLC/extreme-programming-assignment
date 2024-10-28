import { Router } from 'express';
import { Status } from '@prisma/client';
import { ItemRepository } from '../db/repositories/ItemRepository';
import { checkPresent, checkIsStatus } from '../utils';



// TODO: add auth middleware in each route

export const createItemRouter = (itemRepository: ItemRepository) => {
  const router = Router();
  
  router.get('/', async (req, res) => {
    try {
      // TODO: check userId -> listId
      const { userId, listId } = req.query;

      if (!checkPresent(userId, res, 'User id is required')) return;
      if (!checkPresent(listId, res, 'List id is required')) return;
    
      const lists = await itemRepository.getAll(Number(listId));

      res.status(200).json(lists);
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch items for user id ${req.body.userId} and list id ${req.body.listId}` });
    }
  });

  router.post('/', async (req, res) => {
    try {
      // TODO: check userId -> listId
      const { userId, listId, title, description } = req.body;
      
      if (!checkPresent(userId, res, 'User id is required')) return;
      if (!checkPresent(listId, res, 'List id is required')) return;
      if (!checkPresent(title, res, 'Item title is required')) return;
      if (!checkPresent(description, res, 'Item description is required')) return;

      const newItem = await itemRepository.create(listId, title, description);

      res.status(200).json(newItem);
    }
    catch (error) {
      res.status(500).json({ error: `Failed to add item for user with id ${req.body.userId} and list id ${req.body.listId}` });
    }
  });

  router.delete('/', async (req, res) => {
    try {
      // TODO: check userId -> listId
      const { userId, listId, itemId } = req.body;
      
      if (!checkPresent(userId, res, 'User id is required')) return;
      if (!checkPresent(listId, res, 'List id is required')) return;
      if (!checkPresent(itemId, res, 'Item id is required')) return;

      const deletedItem = await itemRepository.delete(itemId);
      if (!deletedItem) {
        res.status(404).json({ error: 'Item not found' });
        return;
      }

      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete item' });
    }
  });

  router.put('/', async (req, res) => {
    try {
      const { userId, listId, itemId, title, description, status } = req.body;

      if (!checkPresent(userId, res, 'User id is required')) return;
      if (!checkPresent(listId, res, 'List id is required')) return;
      if (!checkPresent(itemId, res, 'Item id is required')) return;
      if (status != null && !checkIsStatus(status, res, `Status must be one of [${Object.values(Status).concat()}]`)) return;

      const updatedItem = await itemRepository.update(itemId, title, description, status);
      if (!updatedItem) {
        res.status(404).json({ error: 'Item not found' });
        return;
      }

      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update item' });
    }
  });
  
  return router;
};