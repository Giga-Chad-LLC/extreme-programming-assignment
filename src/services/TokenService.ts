import {RefreshTokenRepository} from "../db/repositories/RefreshTokenRepository";
import {CustomJwtPayload, JwtPayloadData, Tokens} from "../types";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../../env";
import {RefreshToken, User} from "@prisma/client";
import Cookies from "cookies";



export class TokenService {
   constructor(private readonly refreshTokenRepository: RefreshTokenRepository) {}


   // generates access and refresh tokens
   async generateTokens(payload: JwtPayloadData): Promise<Tokens> {
      // retrieving secret from process.env
      const ACCESS_SECRET = JWT_SECRET;
      const REFRESH_SECRET = JWT_SECRET;

      // creating access and refresh tokens
      const accessToken = jwt.sign(payload, ACCESS_SECRET, {
         expiresIn: '30m'
      });

      const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
         expiresIn: '30d'
      });

      return { accessToken, refreshToken };
   }

   // saves new refresh token in db and returns generated token
   async saveRefreshToken(userId: number, refreshToken: string): Promise<RefreshToken> {
      // counting tokens
      const tokensCount = await this.refreshTokenRepository.count(userId);

      // removing tokens from db, if there are more than 3 tokens
      if(tokensCount >= 3) {
         await this.refreshTokenRepository.deleteAllByUserId(userId);
      }

      // saving token in db
      return await this.refreshTokenRepository.create(userId, refreshToken);
   };

   // deletes refresh token from db and returns deleted token
   async removeRefreshToken(userId: number, refreshToken: string): Promise<RefreshToken | null> {
      const token = await this.refreshTokenRepository.get(userId, refreshToken);
      if (!token) {
         throw new Error(`Token ${refreshToken} does not exist`);
      }

      return await this.refreshTokenRepository.delete(userId, refreshToken);
   };

   // validates access token
   static validateAccessToken = (token: string) => {
      try {
         const ACCESS_SECRET = JWT_SECRET;
         return jwt.verify(token, ACCESS_SECRET) as CustomJwtPayload;
      }
      catch {
         return null;
      }
   };

   // validates refresh token
   static validateRefreshToken = (token: string) => {
      try {
         const REFRESH_SECRET = JWT_SECRET;
         return jwt.verify(token, REFRESH_SECRET) as CustomJwtPayload;
      }
      catch {
         return null;
      }
   };

   // async setRefreshTokenInHttpOnlyCookies(req: Request, res: Response, refreshToken: string) {
   //    // setting refresh token in http-only cookies
   //    const cookies = new Cookies(req, res);
   //    cookies.set('refreshToken', refreshToken, {
   //       httpOnly: true,
   //       // secure: true, // this option is used with HTTPS protocol
   //       maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
   //    });
   // };

   // returns payload for tokens
   createTokenPayload(user: User): JwtPayloadData {
      return {
         userId: user.id,
         email: user.email,
      };
   }
}