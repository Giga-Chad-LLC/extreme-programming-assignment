import {Router} from "express";
import {PrismaClient, User} from "@prisma/client";
import {UserRepository} from "../db/repositories/UserRepository";
import {TokenService} from '../services/TokenService';
import {RefreshTokenRepository} from "../db/repositories/RefreshTokenRepository";
import {Tokens} from "../types";

const router = Router();
const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);
const refreshTokenRepository = new RefreshTokenRepository(prisma);
const service = new TokenService(refreshTokenRepository);

router.post('/login', async (req, res) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         res.status(400).json({ message: 'Email and password are required' });
         return;
      }

      const user = await userRepository.getByEmail(email);
      if (!user) {
         res.status(400).json({ message: "User with the provided email not found" });
         return;
      }

      // TODO: use bcrypt to hash password
      const hashedPassword = password;
      if (hashedPassword !== user.password) {
         res.status(400).json({ message: "Invalid password" });
         return;
      }

      // generate JWT token
      const {accessToken, refreshToken} = await generateAndSaveTokens(user);

      res.status(200).json({
         accessToken,
         refreshToken,
         user,
      });
   }
   catch (error) {
      console.error(error);
      res.status(500).json({error: `Failed to login: ${error}`});
   }
});


router.post('/register', async (req, res) => {
   try {
      const {email, password} = req.body;

      if (!email || !password) {
         res.status(400).json({message: 'Email and password are required'});
         return;
      }

      const existingUser = await userRepository.getByEmail(email);
      if (existingUser) {
         res.status(400).json({message: "User with the provided email already exists"});
         return;
      }

      const user = await userRepository.create(email, password);

      // generate JWT token
      const {accessToken, refreshToken} = await generateAndSaveTokens(user);

      res.status(200).json({
         accessToken,
         refreshToken,
         user,
      });
   }
   catch (error) {
      console.error(error);
      res.status(500).json({error: `Failed to register: ${error}`});
   }
});


async function generateAndSaveTokens(user: User): Promise<Tokens> {
   // generate JWT token
   const payload = service.createTokenPayload(user);
   const { accessToken, refreshToken } = await service.generateTokens(payload);
   await service.saveRefreshToken(user.id, refreshToken);

   return { accessToken, refreshToken };
}


export default router;
