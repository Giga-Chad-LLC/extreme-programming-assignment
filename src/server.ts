import express, {type Request, type Response } from 'express';
import { PORT } from "../env";
import userRouter from './routes/users';

const app = express();

app.use(express.json());

// routers
app.use('/users', userRouter);


app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});