import express, {type Request, type Response } from 'express';
import { PORT } from "../env";
import userRouter from './routes/users';
import authRouter from './routes/auth';

const app = express();

app.use(express.json());

// routers
app.use('/users', userRouter);
app.use('/auth', authRouter);


app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});