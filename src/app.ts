import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

// Middleware for logging the entire req object
app.use((req, res, next) => {
  console.log('Request Object:', req.body);
  next();
});

app.use('/api', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
