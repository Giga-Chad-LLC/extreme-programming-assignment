import express, {type Request, type Response } from 'express';
import { PORT } from "../env";
import userRouter from './routes/users';
import authRouter from './routes/auth';
import { createListRouter } from './routes/lists';
import { ListDBRepository } from './db/repositories/ListRepository';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient()

app.use(express.json());

// routers
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter); // TODO: do the same as below
app.use('/lists', createListRouter(new ListDBRepository(prisma)));


app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});