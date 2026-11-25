import 'dotenv/config';
import app from './app.js';

import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { errorHandler } from './utils/errorHandler.js';

import authRouter from './routes/auth.routes.js';
import todoRouter from './routes/todo.routes.js';

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	}),
);
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

app.use(authRouter);
app.use(todoRouter);

app.get('/', (req, res) => {
	res.json({ message: 'hey' });
});
app.use(errorHandler);

app.listen(PORT, () => {
	console.log('Server listening on', PORT);
});
