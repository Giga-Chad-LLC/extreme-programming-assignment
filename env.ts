import env from 'env-var';
import dotenv from 'dotenv';

dotenv.config();

export const PORT = env
   .get('PORT')
   .default('3000')
   .asString();

export const DATABASE_URL = env
   .get('DATABASE_URL')
   .required()
   .asString();

export const JWT_SECRET = env
   .get('JWT_SECRET')
   .required()
   .asString()