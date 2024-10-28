import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { ListRepository } from '../db/repositories/ListRepository';
import { checkPresent } from '../utils';


const router = Router();
const prisma = new PrismaClient();
const listRepository = new ListRepository(prisma);

// TODO: add auth middleware in each route

router.get('/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (!checkPresent(userId, res, 'User id is required')) return;
  
    const lists = await listRepository.getAll(userId);
    console.log(`Lists: ${JSON.stringify(lists)}`);

    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch lists for user with id ${req.body.userId}` });
  }
});

router.post('/', async (req, res) => {
  try {
    const { userId, listName } = req.body;
    
    if (!checkPresent(userId, res, 'User id is required')) return;
    if (!checkPresent(listName, res, 'List name is required')) return;

    const newList = await listRepository.create(userId, listName);
    console.log(`New list: ${JSON.stringify(newList)}`);

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
    const { userId, listId, newName } = req.body;

    if (!checkPresent(userId, res, 'User id is required')) return;
    if (!checkPresent(listId, res, 'List id is required')) return;
    if (!checkPresent(newName, res, 'List name is required')) return;

    const updatedList = await listRepository.update(userId, listId, newName);
    if (!updatedList) {
      res.status(404).json({ error: 'List not found' });
      return;
    }

    res.status(200).json(updatedList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update list' });
  }
});

export default router;