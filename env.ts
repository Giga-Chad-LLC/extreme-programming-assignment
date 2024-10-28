import env from 'env-var';
import dotenv from 'dotenv';

dotenv.config();

export const PORT = env
   .get('PORT')
   .default('3000')
   .asString();
