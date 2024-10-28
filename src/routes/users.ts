import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../db/repositories/UserRepository';


const router = Router();
const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);

// router.post('/', async (req, res) => {
//    try {
//       if (!req.body.email) {
//          res.status(400).json({ error: 'Email is required' });
//          return;
//       }
//       const email = req.body.email;
//
//       const user = await userRepository.create(email);
//       res.status(201).json(user);
//    } catch (error) {
//       console.error(error)
//       res.status(500).json({ error: 'Failed to create user' });
//    }
// });

router.get('/', async (req, res) => {
   try {
      const users = await userRepository.getAll();
      res.status(200).json(users);
   } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
   }
});

export default router;