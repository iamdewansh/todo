import 'dotenv/config';
import app from './app.js';
import {
	forgotPassword,
	login,
	loginWithGoogle,
	logout,
	oauthCallback,
	refreshAccessToken,
	resetCallback,
	resetPassword,
	signUp,
} from './controllers/auth.controller.js';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { verifyToken } from './middleware/auth.middleware.js';
import { errorHandler } from './utils/errorHandler.js';

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	}),
);
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

app.post('/signup', signUp);
app.post('/login', login);
app.post('/logout', logout);
app.get('/auth/google', loginWithGoogle);
app.get('/auth/callback', oauthCallback);

app.post('/forgotPassword',forgotPassword)
app.get('/auth/reset/callback',resetCallback)
app.post('/resetPassword',resetPassword)

app.post('/v', (req, res) => {
	console.log(req.body);
	res.send('hey');
});
app.get('/', (req, res) => {
	res.send('hey');
});
app.use(errorHandler);

app.listen(PORT, () => {
	console.log('Server listening on', PORT);
});
