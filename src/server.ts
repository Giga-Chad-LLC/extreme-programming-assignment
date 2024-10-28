import express, {type Request, type Response } from 'express';
import { PORT } from "../env";
import userRouter from './routes/users';
import authRouter from './routes/auth';
import listRouter from './routes/lists';

const app = express();

app.use(express.json());

// routers
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/lists', listRouter);


app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});