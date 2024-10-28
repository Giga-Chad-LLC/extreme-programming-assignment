import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {JWT_SECRET} from "../../env";
import {CustomJwtPayload} from "../types";
import { PrismaClient } from '@prisma/client';
import {UserRepository} from "../db/repositories/UserRepository";

dotenv.config();

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

   if (!token) {
      return res.status(401).json({ message: 'Access token is missing or invalid' });
   }

   jwt.verify(token, JWT_SECRET, async (err, jwtPayload) => {
      if (err) {
         return res.status(403).json({ message: 'Invalid token' });
      }

      const payload = jwtPayload as CustomJwtPayload;

      if (!payload.email || !payload.userId) {
         return res.status(403).json({ message: 'Invalid token' });
      }

      // TODO: get it from somewhere (req.app.get()?)

      // check that user exists

      const userRepository = new UserRepository(new PrismaClient());

      const user = await userRepository.getById(payload.userId);

      if (!user) {
         return res.status(403).json({ message: 'Invalid payload credentials' });
      }

      // set user in request
      req.user = user;
      next();
   });
};