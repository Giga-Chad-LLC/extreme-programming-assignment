import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { ListRepository } from '../db/repositories/ListRepository';
import { checkPresent } from '../utils';



// TODO: add auth middleware in each route

export const createListRouter = (listRepository: ListRepository) => {
  const router = Router();
  
  router.get('/', async (req, res) => {
    try {
      const userId = req.query.userId
      if (!checkPresent(req.query.userId, res, 'User id is required')) return;

      const lists = await listRepository.getAll(Number(userId));

      res.status(200).json(lists);
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch lists for user with id ${req.body.userId}` });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const { userId, name } = req.body;
      
      if (!checkPresent(userId, res, 'User id is required')) return;
      if (!checkPresent(name, res, 'List name is required')) return;

      const newList = await listRepository.create(userId, name);

      res.status(200).json(newList);
    }
    catch (error) {
      res.status(500).json({ error: `Failed to add list for user with id ${req.body.userId}` });
    }
  });

  router.delete('/', async (req, res) => {
    try {
      const { userId, listId } = req.body;
      
      if (!checkPresent(userId, res, 'User id is required')) return;
      if (!checkPresent(listId, res, 'List id is required')) return;

      const deletedList = await listRepository.delete(userId, listId);
      if (!deletedList) {
        res.status(404).json({ error: 'List not found' });
        return;
      }

      res.status(200).json({ message: 'List deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete list' });
    }
  });

  router.put('/', async (req, res) => {
    try {
      const { userId, listId, name } = req.body;

      if (!checkPresent(userId, res, 'User id is required')) return;
      if (!checkPresent(listId, res, 'List id is required')) return;
      if (!checkPresent(name, res, 'List name is required')) return;

      const updatedList = await listRepository.update(userId, listId, name);
      if (!updatedList) {
        res.status(404).json({ error: 'List not found' });
        return;
      }

      res.status(200).json(updatedList);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update list' });
    }
  });
  
  return router;
};