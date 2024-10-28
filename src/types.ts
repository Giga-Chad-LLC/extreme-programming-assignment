import jwt from "jsonwebtoken";

export interface CustomJwtPayload extends jwt.JwtPayload {
   userId: number;
   email: string;
}

export interface JwtPayloadData {
   userId: number;
   email: string;
}

export interface Tokens {
   refreshToken: string;
   accessToken: string;
}