import express from 'express';

import { errorHandler } from '@/middlewares/errorHandler';
import bookRoutes from '@/routes/bookRoutes';
import userRoutes from '@/routes/userRoutes';

const app = express();

app.use(express.json());

app.use('/books', bookRoutes);
app.use('/users', userRoutes);

app.use(errorHandler);

export default app;
